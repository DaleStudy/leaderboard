import { beforeEach, expect, test, vi } from "vitest";
import { mock } from "vitest-mock-extended";
import {
  type GitHubMember,
  type GitHubTeam,
  type GitHubTree,
  getGitTrees,
  getTeamMembers,
  getTeams,
} from "../../infra/gitHub/gitHubClient";
import { createFetchService } from "./fetchService";

const mockGitHubMembers = Array.from({ length: 10 }, (_, idx) => ({
  ...mock<GitHubMember>(),
  login: `member${idx}`,
  id: idx,
}));

const mockGitHubTeams = [
  mock<GitHubTeam>({ name: "leetcode1" }),
  mock<GitHubTeam>({ name: "leetcode2" }),
  mock<GitHubTeam>({ name: "another-team" }),
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

vi.mock("../../infra/gitHub/gitHubClient");

let fetchService: ReturnType<typeof createFetchService>;

beforeEach(() => {
  vi.clearAllMocks();
  fetchService = createFetchService();
});

test("fetchMembers should fetch and transform members correctly", async () => {
  // Arrange
  vi.mocked(getTeams).mockResolvedValue(mockGitHubTeams);
  vi.mocked(getTeamMembers).mockResolvedValue(mockGitHubMembers);

  // Act
  const result = await fetchService.fetchMembers();

  // Assert
  expect(getTeams).toHaveBeenCalledWith();
  expect(getTeams).toHaveBeenCalledOnce();
  expect(result).toEqual(
    mockGitHubMembers.map((member) => ({
      id: member.login.toLowerCase(),
      name: member.login,
      profileUrl: member.avatarUrl,
      cohorts: [1, 2],
    })),
  );
});

test("fetchMembers should handle duplicate members preferring higher cohort", async () => {
  // Arrange
  vi.mocked(getTeams).mockResolvedValue(mockGitHubTeams);
  const duplicateMember = mockGitHubMembers[0];
  vi.mocked(getTeamMembers)
    .mockResolvedValueOnce([duplicateMember]) // cohort 1
    .mockResolvedValueOnce([duplicateMember]); // cohort 2

  // Act
  const result = await fetchService.fetchMembers();

  // Assert
  expect(result).toHaveLength(1);
  expect(result[0]).toEqual({
    id: duplicateMember.login.toLowerCase(),
    name: duplicateMember.login,
    profileUrl: duplicateMember.avatarUrl,
    cohorts: [1, 2],
  });
});

test("fetchMembers should filter out non-prefix teams", async () => {
  // Arrange
  vi.mocked(getTeams).mockResolvedValue([
    mock<GitHubTeam>({ name: "another-team" }),
  ]);

  // Act
  const result = await fetchService.fetchMembers();

  // Assert
  expect(result).toHaveLength(0);
  expect(getTeamMembers).not.toHaveBeenCalled();
});

test("fetchMembers should handle duplicate members keeping the latest cohort", async () => {
  // Arrange
  vi.mocked(getTeams).mockResolvedValue(mockGitHubTeams);
  const duplicateMember = mockGitHubMembers[0];

  // same member in two different cohorts
  vi.mocked(getTeamMembers)
    .mockResolvedValueOnce([{ ...duplicateMember }]) // earlier cohort
    .mockResolvedValueOnce([{ ...duplicateMember }]); // later cohort

  // Act
  const result = await fetchService.fetchMembers();

  // Assert
  expect(result).toHaveLength(1);
  expect(result[0]).toEqual({
    id: duplicateMember.login.toLowerCase(),
    name: duplicateMember.login,
    profileUrl: duplicateMember.avatarUrl,
    cohorts: [1, 2],
  });
});

test("fetchSubmissions should fetch and parse submissions correctly", async () => {
  // Arrange
  vi.mocked(getGitTrees).mockResolvedValue(mockGitHubTrees);

  // Act
  const result = await fetchService.fetchSubmissions();

  // Assert
  expect(getGitTrees).toHaveBeenCalledWith();

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
  vi.mocked(getGitTrees).mockResolvedValue(treeWithInvalidPaths);

  // Act
  const result = await fetchService.fetchSubmissions();

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
  vi.mocked(getGitTrees).mockResolvedValue([
    ...mockGitHubTrees,
    {
      path: "README.md",
      type: "blob",
    },
  ]);

  // Act
  const result = await fetchService.fetchSubmissions();

  // Assert
  expect(result).toHaveLength(3);
  expect(
    result.every(
      (submission) => submission.problemTitle && submission.memberId,
    ),
  ).toBe(true);
});
