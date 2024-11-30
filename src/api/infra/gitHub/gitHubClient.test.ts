import { test, expect, beforeEach, vi } from "vitest";
import { mock } from "vitest-mock-extended";
import { createGitHubClient } from "./gitHubClient";
import { GitHubMember, GitHubTeam, GitHubTree } from "./types";

// Mock data
const mockGitHubTeams = mock<GitHubTeam[]>();
const mockGitHubMembers = mock<GitHubMember[]>();
const mockGitHubTrees = mock<GitHubTree[]>();

const mockFetch = vi.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockClear();
});

test("getTeamNames should fetch and return team names", async () => {
  // Arrange
  mockFetch.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(mockGitHubTeams),
  });
  const client = createGitHubClient("test-token");
  const expectedUrl = `https://api.github.com/orgs/test-org/teams`;
  const expectedHeaders = {
    Accept: "application/vnd.github+json",
    Authorization: `token ${"test-token"}`,
  };

  // Act
  const result = await client.getTeamNames("test-org");

  // Assert
  expect(mockFetch).toHaveBeenCalledWith(expectedUrl, {
    headers: expectedHeaders,
  });
  expect(result).toEqual(mockGitHubTeams.map((team) => team.name));
});

test("getTeamNames should throw error when fetch fails", async () => {
  // Arrange
  mockFetch.mockResolvedValue({
    ok: false,
    status: 404,
    statusText: "Not Found",
  });
  const client = createGitHubClient("test-token");

  // Act & Assert
  await expect(client.getTeamNames("test-org")).rejects.toThrow(
    "Failed to fetch url",
  );
});

test("getTeamMembers should fetch and return team members", async () => {
  // Arrange
  mockFetch.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(mockGitHubMembers),
  });
  const client = createGitHubClient("test-token");
  const expectedUrl = `https://api.github.com/orgs/test-org/teams/test-team/members`;
  const expectedHeaders = {
    Accept: "application/vnd.github+json",
    Authorization: `token ${"test-token"}`,
  };

  // Act
  const result = await client.getTeamMembers("test-org", "test-team");

  // Assert
  expect(mockFetch).toHaveBeenCalledWith(expectedUrl, {
    headers: expectedHeaders,
  });
  expect(result).toEqual(mockGitHubMembers);
});

test("getDirectoryTree should fetch and return directory tree", async () => {
  // Arrange
  mockFetch.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ tree: mockGitHubTrees }),
  });
  const client = createGitHubClient("test-token");
  const expectedUrl = `https://api.github.com/repos/test-owner/test-repo/git/trees/main?recursive=1`;
  const expectedHeaders = {
    Accept: "application/vnd.github+json",
    Authorization: `token ${"test-token"}`,
  };

  // Act
  const result = await client.getDirectoryTree(
    "test-owner",
    "test-repo",
    "main",
  );

  // Assert
  expect(mockFetch).toHaveBeenCalledWith(expectedUrl, {
    headers: expectedHeaders,
  });
  expect(result).toEqual(mockGitHubTrees);
});

test("error should include detailed information", async () => {
  // Arrange
  const status = 403;
  const statusText = "Forbidden";
  mockFetch.mockResolvedValue({
    ok: false,
    status,
    statusText,
  });
  const client = createGitHubClient("test-token");
  const expectedErrorMessage = `Failed to fetch url: https://api.github.com/orgs/test-org/teams, status: ${status}, statusText: ${statusText}`;

  // Act & Assert
  await expect(client.getTeamNames("test-org")).rejects.toThrow(
    expectedErrorMessage,
  );
});
