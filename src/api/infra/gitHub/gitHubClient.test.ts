import { test, expect, beforeEach, vi } from "vitest";
import { createGitHubClient } from "./gitHubClient";
import { CONFIG } from "../../config";
import { mockGitHubTeams, mockGitHubMembers, mockGitHubTree } from "./fixtures";

const mockConfig = {
  ...CONFIG.gitHub,
  token: "test-token",
};

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
  const client = createGitHubClient(mockConfig);
  const expectedUrl = `${mockConfig.baseUrl}/orgs/test-org/teams`;
  const expectedHeaders = {
    Accept: mockConfig.mediaType,
    Authorization: `token ${mockConfig.token}`,
  };

  // Act
  const result = await client.getTeamNames("test-org");

  // Assert
  expect(mockFetch).toHaveBeenCalledWith(expectedUrl, {
    headers: expectedHeaders,
  });
  expect(result).toEqual(["leetcode01", "leetcode02"]);
});

test("getTeamNames should throw error when fetch fails", async () => {
  // Arrange
  mockFetch.mockResolvedValue({
    ok: false,
    status: 404,
    statusText: "Not Found",
  });
  const client = createGitHubClient(mockConfig);

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
  const client = createGitHubClient(mockConfig);
  const expectedUrl = `${mockConfig.baseUrl}/orgs/test-org/teams/test-team/members`;
  const expectedHeaders = {
    Accept: mockConfig.mediaType,
    Authorization: `token ${mockConfig.token}`,
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
    json: () => Promise.resolve({ tree: mockGitHubTree }),
  });
  const client = createGitHubClient(mockConfig);
  const expectedUrl = `${mockConfig.baseUrl}/repos/test-owner/test-repo/git/trees/main?recursive=1`;
  const expectedHeaders = {
    Accept: mockConfig.mediaType,
    Authorization: `token ${mockConfig.token}`,
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
  expect(result).toEqual(mockGitHubTree);
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
  const client = createGitHubClient(mockConfig);
  const expectedErrorMessage = `Failed to fetch url: ${mockConfig.baseUrl}/orgs/test-org/teams, status: ${status}, statusText: ${statusText}`;

  // Act & Assert
  await expect(client.getTeamNames("test-org")).rejects.toThrow(
    expectedErrorMessage,
  );
});