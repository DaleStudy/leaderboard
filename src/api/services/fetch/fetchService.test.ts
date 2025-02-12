import { beforeEach, expect, test, vi } from "vitest";
import { mock } from "vitest-mock-extended";
import { createGitHubClient } from "../../infra/gitHub/gitHubClient";
import { createFetchService } from "./fetchService";
import type { Grade } from "../types";
import type {
  GitHubMember,
  GitHubTeam,
  GitHubTree,
} from "../../infra/gitHub/types";

// Mock data
const dummyConfig = {
  totalProblemCount: 6,
  gradeThresholds: [
    ["TREE", 5],
    ["FRUIT", 4],
    ["BRANCH", 3],
    ["LEAF", 2],
    ["SPROUT", 1],
    ["SEED", 0],
  ] as [Grade, number][],
  gitHubToken: "test-token",
};

const mockGitHubMembers = Array.from({ length: 10 }, (_, idx) => ({
  ...mock<GitHubMember>(),
  login: `member${idx}`,
  id: idx,
}));

const mockGitHubTeams = [
  { ...mock<GitHubTeam>(), name: "leetcode1" },
  { ...mock<GitHubTeam>(), name: "leetcode2" },
  { ...mock<GitHubTeam>(), name: "another-team" },
];

const mockGitHubTrees: GitHubTree[] = [
  "problem1/algo.js",
  "problem1/dale.py",
  "problem2/algo.ts",
  "invalid/path",
  "README.md",
].map((path) => ({
  ...mock<GitHubTree>(),
  type: "blob",
  path,
}));

// Mock services
const mockGetTeamNames = vi.fn();
const mockGetTeamMembers = vi.fn();
const mockGetDirectoryTree = vi.fn();

vi.mock("../../infra/gitHub/gitHubClient");
vi.mocked(createGitHubClient).mockReturnValue({
  getTeamNames: mockGetTeamNames,
  getTeamMembers: mockGetTeamMembers,
  getDirectoryTree: mockGetDirectoryTree,
});

let fetchService: ReturnType<typeof createFetchService>;

beforeEach(() => {
  vi.clearAllMocks();
  fetchService = createFetchService(dummyConfig);
});

test("fetchMembers should fetch and transform members correctly", async () => {
  // Arrange
  const teamNames = mockGitHubTeams.map((team) => team.name);
  mockGetTeamNames.mockResolvedValue(teamNames);
  mockGetTeamMembers.mockResolvedValue(mockGitHubMembers);

  // Act
  const result = await fetchService.fetchMembers();

  // Assert
  expect(mockGetTeamNames).toHaveBeenCalledWith("DaleStudy");
  expect(mockGetTeamMembers).toHaveBeenCalledTimes(2); // Only algodale teams
  expect(result).toEqual(
    mockGitHubMembers.map((member) => ({
      id: member.login.toLowerCase(),
      name: member.login,
      profileUrl: member.avatar_url,
      cohorts: [1, 2],
    })),
  );
});

test("fetchMembers should handle duplicate members preferring higher cohort", async () => {
  // Arrange
  const teamNames = mockGitHubTeams.map((team) => team.name);
  mockGetTeamNames.mockResolvedValue(teamNames);
  const duplicateMember = mockGitHubMembers[0];
  mockGetTeamMembers
    .mockResolvedValueOnce([duplicateMember]) // cohort 1
    .mockResolvedValueOnce([duplicateMember]); // cohort 2

  // Act
  const result = await fetchService.fetchMembers();

  // Assert
  expect(result).toHaveLength(1);
  expect(result[0]).toEqual({
    id: duplicateMember.login.toLowerCase(),
    name: duplicateMember.login,
    profileUrl: duplicateMember.avatar_url,
    cohorts: [1, 2],
  });
});

test("fetchMembers should filter out non-prefix teams", async () => {
  // Arrange
  mockGetTeamNames.mockResolvedValue(["another-team"]);

  // Act
  const result = await fetchService.fetchMembers();

  // Assert
  expect(result).toHaveLength(0);
  expect(mockGetTeamMembers).not.toHaveBeenCalled();
});

test("fetchMembers should handle duplicate members keeping the latest cohort", async () => {
  // Arrange
  const teamNames = mockGitHubTeams.map((team) => team.name);
  mockGetTeamNames.mockResolvedValue(teamNames);
  const duplicateMember = mockGitHubMembers[0];

  // same member in two different cohorts
  mockGetTeamMembers
    .mockResolvedValueOnce([{ ...duplicateMember, cohorts: [1] }]) // earlier cohort
    .mockResolvedValueOnce([{ ...duplicateMember, cohorts: [2] }]); // later cohort

  // Act
  const result = await fetchService.fetchMembers();

  // Assert
  expect(result).toHaveLength(1);
  expect(result[0]).toEqual({
    id: duplicateMember.login.toLowerCase(),
    name: duplicateMember.login,
    profileUrl: duplicateMember.avatar_url,
    cohorts: [1, 2],
  });
});

test("fetchSubmissions should fetch and parse submissions correctly", async () => {
  // Arrange
  mockGetDirectoryTree.mockResolvedValue(mockGitHubTrees);

  // Act
  const result = await fetchService.fetchSubmissions("test-repo");

  // Assert
  expect(mockGetDirectoryTree).toHaveBeenCalledWith(
    "DaleStudy",
    "test-repo",
    "main",
  );

  expect(result).toEqual([
    {
      memberId: "algo",
      problemTitle: "problem1",
      language: "js",
    },
    {
      memberId: "dale",
      problemTitle: "problem1",
      language: "py",
    },
    {
      memberId: "algo",
      problemTitle: "problem2",
      language: "ts",
    },
  ]);
});

test("fetchSubmissions should filter out invalid submission paths", async () => {
  // Arrange
  const treeWithInvalidPaths = [
    ...mockGitHubTrees,
    {
      path: "invalid/path/format",
      type: "blob",
      mode: "100644",
      sha: "3",
      size: 0,
      url: "some-url",
    },
  ];
  mockGetDirectoryTree.mockResolvedValue(treeWithInvalidPaths);

  // Act
  const result = await fetchService.fetchSubmissions("test-repo");

  // Assert
  expect(result).toHaveLength(3); // invalid path should be filtered out
  expect(
    result.every(
      (submission) =>
        submission.memberId && submission.problemTitle && submission.language,
    ),
  ).toBe(true);
});

test("fetchSubmissions should filter out non-submission files", async () => {
  // Arrange
  mockGetDirectoryTree.mockResolvedValue([
    ...mockGitHubTrees,
    {
      path: "README.md",
      type: "blob",
      mode: "100644",
      sha: "4",
      size: 0,
      url: "some-url",
    },
  ]);

  // Act
  const result = await fetchService.fetchSubmissions("test-repo");

  // Assert
  expect(result).toHaveLength(3);
  expect(
    result.every(
      (submission) => submission.problemTitle && submission.memberId,
    ),
  ).toBe(true);
});
