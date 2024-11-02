import { test, expect, beforeEach, vi } from "vitest";
import { createFetchService } from "./fetchService";
import {
  mockGithubMembers,
  mockGithubTeams,
  mockGithubTree,
  mockConfig,
} from "../common/fixtures";

const mockGetTeamNames = vi.fn();
const mockGetTeamMembers = vi.fn();
const mockGetDirectoryTree = vi.fn();

vi.mock("../../infra/github/githubClient", () => ({
  createGithubClient: () => ({
    getTeamNames: mockGetTeamNames,
    getTeamMembers: mockGetTeamMembers,
    getDirectoryTree: mockGetDirectoryTree,
  }),
}));

let fetchService: ReturnType<typeof createFetchService>;

beforeEach(() => {
  vi.clearAllMocks();
  fetchService = createFetchService(mockConfig);
});

test("fetchMembers should fetch and transform members correctly", async () => {
  // Arrange
  const teamNames = mockGithubTeams.map((team) => team.name);
  mockGetTeamNames.mockResolvedValue(teamNames);
  mockGetTeamMembers.mockResolvedValue(mockGithubMembers);

  // Act
  const result = await fetchService.fetchMembers();

  // Assert
  expect(mockGetTeamNames).toHaveBeenCalledWith(mockConfig.study.organization);
  expect(mockGetTeamMembers).toHaveBeenCalledTimes(2); // Only algodale teams
  expect(result).toEqual(
    mockGithubMembers.map((member) => ({
      id: member.login.toLowerCase(),
      name: member.login,
      profileUrl: member.avatar_url,
      cohort: 2,
    })),
  );
});

test("fetchMembers should handle duplicate members preferring higher cohort", async () => {
  // Arrange
  const teamNames = mockGithubTeams.map((team) => team.name);
  mockGetTeamNames.mockResolvedValue(teamNames);
  const duplicateMember = mockGithubMembers[0];
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
    cohort: 2,
  });
});

test("fetchMembers should throw error for invalid cohort number", async () => {
  // Arrange
  mockGetTeamNames.mockResolvedValue(["algodaleinvalid"]);

  // Act & Assert
  await expect(fetchService.fetchMembers()).rejects.toThrow(
    "Invalid cohort number",
  );
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
  const teamNames = mockGithubTeams.map((team) => team.name);
  mockGetTeamNames.mockResolvedValue(teamNames);
  const duplicateMember = mockGithubMembers[0];

  // same member in two different cohorts
  mockGetTeamMembers
    .mockResolvedValueOnce([{ ...duplicateMember, cohort: 1 }]) // earlier cohort
    .mockResolvedValueOnce([{ ...duplicateMember, cohort: 2 }]); // later cohort

  // Act
  const result = await fetchService.fetchMembers();

  // Assert
  expect(result).toHaveLength(1);
  expect(result[0]).toEqual({
    id: duplicateMember.login.toLowerCase(),
    name: duplicateMember.login,
    profileUrl: duplicateMember.avatar_url,
    cohort: 2,
  });
});

test("fetchSubmissions should fetch and parse submissions correctly", async () => {
  // Arrange
  mockGetDirectoryTree.mockResolvedValue(mockGithubTree);

  // Act
  const result = await fetchService.fetchSubmissions("test-repo");

  // Assert
  expect(mockGetDirectoryTree).toHaveBeenCalledWith(
    mockConfig.study.organization,
    "test-repo",
    mockConfig.study.branchName,
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
    ...mockGithubTree,
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
    ...mockGithubTree,
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
