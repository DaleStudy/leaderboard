import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
  beforeAll,
  afterAll,
} from "vitest";
import { GithubApiClient } from "./GithubApiClient";
import type { IFetchClient } from "../../utils/interfaces";
import type { GithubTeam, GithubMember, GithubTreeResponse } from "./types";
import { mockGithubMembers, mockGithubTeams, mockGithubTree } from "./fixtures";

let githubApiClient: GithubApiClient;
let mockFetchClient: IFetchClient;
const mockToken = "mock-github-token";

beforeAll(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  vi.restoreAllMocks();
});

beforeEach(() => {
  // Mock FetchClient
  mockFetchClient = {
    baseUrl: "",
    baseHeaders: [],
    get: vi.fn(),
    setBaseUrl: vi.fn().mockReturnThis(),
    setBaseHeaders: vi.fn().mockReturnThis(),
  };

  githubApiClient = new GithubApiClient(mockFetchClient, mockToken);
});

describe("initialization", () => {
  it("should initialize with correct base URL and headers", () => {
    expect(mockFetchClient.setBaseUrl).toHaveBeenCalledWith(
      "https://api.github.com",
    );
    expect(mockFetchClient.setBaseHeaders).toHaveBeenCalledWith([
      ["Accept", "application/vnd.github+json"],
      ["Authorization", `Bearer ${mockToken}`],
    ]);
  });

  it("should throw error when token is NOT provided", () => {
    expect(() => new GithubApiClient(mockFetchClient, "")).toThrow(
      new Error("GitHub token is required but not provided"),
    );
  });
});

describe("getTeams", () => {
  const mockTeams: GithubTeam[] = mockGithubTeams;

  it("should fetch teams successfully", async () => {
    // Arrange
    vi.mocked(mockFetchClient.get).mockResolvedValueOnce(mockTeams);
    const orgName = "test-org";

    // Act
    const result = await githubApiClient.getTeams(orgName);

    // Assert
    expect(result).toEqual(mockTeams);
    expect(mockFetchClient.get).toHaveBeenCalledWith("/orgs/test-org/teams");
  });

  it("should handle error when fetching teams fails", async () => {
    // Arrange
    const error = new Error("API Error");
    vi.mocked(mockFetchClient.get).mockRejectedValueOnce(error);
    const orgName = "test-org";

    // Act & Assert
    await expect(githubApiClient.getTeams(orgName)).rejects.toThrow();
  });
});

describe("getTeamMembers", () => {
  const mockMembers: GithubMember[] = mockGithubMembers;

  it("should fetch team members successfully", async () => {
    // Arrange
    vi.mocked(mockFetchClient.get).mockResolvedValueOnce(mockMembers);
    const orgName = "test-org";
    const teamName = "test-team";

    // Act
    const result = await githubApiClient.getTeamMembers(orgName, teamName);

    // Assert
    expect(result).toEqual(mockMembers);
    expect(mockFetchClient.get).toHaveBeenCalledWith(
      "/orgs/test-org/teams/test-team/members",
    );
  });

  it("should handle error when fetching team members fails", async () => {
    // Arrange
    const error = new Error("API Error");
    vi.mocked(mockFetchClient.get).mockRejectedValueOnce(error);
    const orgName = "test-org";
    const teamName = "test-team";

    // Act & Assert
    await expect(
      githubApiClient.getTeamMembers(orgName, teamName),
    ).rejects.toThrow();
  });
});

describe("getDirectoryTree", () => {
  const mockTreeResponse: GithubTreeResponse = {
    sha: "test-sha",
    tree: mockGithubTree,
    url: "",
  };

  it("should fetch directory tree successfully", async () => {
    // Arrange
    vi.mocked(mockFetchClient.get).mockResolvedValueOnce(mockTreeResponse);
    const owner = "test-owner";
    const repo = "test-repo";
    const treeSha = "main";

    // Act
    const result = await githubApiClient.getDirectoryTree(owner, repo, treeSha);

    // Assert
    expect(result).toEqual(mockTreeResponse.tree);
    expect(mockFetchClient.get).toHaveBeenCalledWith(
      "/repos/test-owner/test-repo/git/trees/main?recursive=1",
    );
  });

  it("should handle recursive parameter", async () => {
    // Arrange
    vi.mocked(mockFetchClient.get).mockResolvedValueOnce(mockTreeResponse);
    const owner = "test-owner";
    const repo = "test-repo";
    const treeSha = "main";
    const recursive = 0;

    // Act
    await githubApiClient.getDirectoryTree(owner, repo, treeSha, recursive);

    // Assert
    expect(mockFetchClient.get).toHaveBeenCalledWith(
      "/repos/test-owner/test-repo/git/trees/main?recursive=0",
    );
  });

  it("should handle error when fetching directory tree fails", async () => {
    // Arrange
    const error = new Error("API Error");
    vi.mocked(mockFetchClient.get).mockRejectedValueOnce(error);
    const owner = "test-owner";
    const repo = "test-repo";
    const treeSha = "main";

    // Act & Assert
    await expect(
      githubApiClient.getDirectoryTree(owner, repo, treeSha),
    ).rejects.toThrow();
  });
});

describe("URL building", () => {
  it("should handle special characters in URLs", async () => {
    // Arrange
    vi.mocked(mockFetchClient.get).mockResolvedValueOnce([]);
    const orgName = "test/org"; // Contains special character

    // Act
    await githubApiClient.getTeams(orgName);

    // Assert
    expect(mockFetchClient.get).toHaveBeenCalledWith(
      "/orgs/test%2Forg/teams", // Special character is encoded
    );
  });

  it("should handle empty values in URL template", async () => {
    // Arrange
    vi.mocked(mockFetchClient.get).mockResolvedValueOnce([]);
    const orgName = "";

    // Act
    await githubApiClient.getTeams(orgName);

    // Assert
    expect(mockFetchClient.get).toHaveBeenCalledWith(
      "/orgs//teams", // Empty value becomes empty string
    );
  });
});
