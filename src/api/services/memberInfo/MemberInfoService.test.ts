import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
  beforeAll,
  afterAll,
} from "vitest";
import { MemberInfoService } from "./MemberInfoService";
import { IGithubApiClient } from "../github/interfaces";
import {
  mockGithubInfo,
  mockGithubMembers,
  mockGithubTeams,
  mockGithubTree,
} from "./fixtures";
import { Grades } from "./types";

let service: MemberInfoService;
let mockGithubApiClient: IGithubApiClient;

beforeAll(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  vi.restoreAllMocks();
});

beforeEach(() => {
  mockGithubApiClient = {
    getTeams: vi.fn(),
    getTeamMembers: vi.fn(),
    getDirectoryTree: vi.fn(),
  };

  service = new MemberInfoService(mockGithubApiClient, mockGithubInfo);
});

describe("getMemberInfo", () => {
  it("should return complete member info with submissions", async () => {
    // Arrange
    vi.mocked(mockGithubApiClient.getTeams).mockResolvedValue(
      mockGithubTeams, // 2 teams
    );
    vi.mocked(mockGithubApiClient.getTeamMembers).mockResolvedValue(
      mockGithubMembers, // 2 members
    );
    vi.mocked(mockGithubApiClient.getDirectoryTree).mockResolvedValue(
      mockGithubTree, // 3 submissions
    );

    // Act
    const result = await service.getMemberInfo();

    // Assert
    expect(result.total).toBe(2); // 2 members
    expect(result.data).toHaveLength(2);

    const user1 = result.data.find((member) => member.name === "algo");
    expect(user1).toBeDefined();
    expect(user1?.totalSubmissions).toBe(2); // problem1 and problem2
    expect(user1?.submissions).toHaveLength(2);

    const user2 = result.data.find((member) => member.name === "dale");
    expect(user2).toBeDefined();
    expect(user2?.totalSubmissions).toBe(1); // only problem1
    expect(user2?.submissions).toHaveLength(1);
  });

  it("should return empty result when team fetch fails", async () => {
    // Arrange
    vi.mocked(mockGithubApiClient.getTeams).mockRejectedValue(
      new Error("API Error"),
    );

    // Act
    const result = await service.getMemberInfo();

    // Assert
    expect(result.total).toBe(0);
    expect(result.data).toEqual([]);
  });

  it("should filter teams by prefix", async () => {
    // Arrange
    vi.mocked(mockGithubApiClient.getTeams).mockResolvedValue(mockGithubTeams);
    vi.mocked(mockGithubApiClient.getTeamMembers).mockResolvedValue([]);

    // Act
    await service.getMemberInfo();

    // Assert
    expect(vi.mocked(mockGithubApiClient.getTeamMembers)).toHaveBeenCalledTimes(
      2,
    ); // only algodale01 and algodale02. another-team should be filtered out
    expect(
      vi.mocked(mockGithubApiClient.getTeamMembers),
    ).not.toHaveBeenCalledWith(mockGithubInfo.orgName, "another-team");
  });
});

describe("submission parsing", () => {
  it("should correctly parse valid submission paths", async () => {
    // Arrange
    vi.mocked(mockGithubApiClient.getTeams).mockResolvedValue([
      mockGithubTeams[0],
    ]);
    vi.mocked(mockGithubApiClient.getTeamMembers).mockResolvedValue([
      mockGithubMembers[0],
    ]);
    vi.mocked(mockGithubApiClient.getDirectoryTree).mockResolvedValue([
      { ...mockGithubTree[0], path: "problem1/algo.js", type: "blob" },
    ]);

    // Act
    const result = await service.getMemberInfo();

    // Assert
    const submission = result.data[0].submissions[0];
    expect(submission).toEqual({
      memberId: "algo",
      problemTitle: "problem1",
      language: "js",
    });
  });

  it("should ignore invalid submission paths", async () => {
    // Arrange
    vi.mocked(mockGithubApiClient.getTeams).mockResolvedValue([
      mockGithubTeams[0],
    ]);
    vi.mocked(mockGithubApiClient.getTeamMembers).mockResolvedValue([
      mockGithubMembers[0],
    ]);
    vi.mocked(mockGithubApiClient.getDirectoryTree).mockResolvedValue([
      { ...mockGithubTree[0], path: "invalid/path/format", type: "blob" },
    ]);

    // Act
    const result = await service.getMemberInfo();

    // Assert
    expect(result.data[0].submissions).toHaveLength(0);
  });
});

describe("cohort extraction", () => {
  it("should extract correct cohort number from team name", async () => {
    // Arrange
    vi.mocked(mockGithubApiClient.getTeams).mockResolvedValue([
      { ...mockGithubTeams[0], name: "algodale03" },
    ]);
    vi.mocked(mockGithubApiClient.getTeamMembers).mockResolvedValue([
      mockGithubMembers[0],
    ]);
    vi.mocked(mockGithubApiClient.getDirectoryTree).mockResolvedValue([]);

    // Act
    const result = await service.getMemberInfo();

    // Assert
    expect(result.data[0].cohort).toBe(3);
  });

  // TODO: Remove this when cohort number is applied on 'leetcode' team
  it("should use default cohort number for invalid team names", async () => {
    // Arrange
    vi.mocked(mockGithubApiClient.getTeams).mockResolvedValue([
      { ...mockGithubTeams[0], name: "algodale" },
    ]);
    vi.mocked(mockGithubApiClient.getTeamMembers).mockResolvedValue([
      mockGithubMembers[0],
    ]);
    vi.mocked(mockGithubApiClient.getDirectoryTree).mockResolvedValue([]);

    // Act
    const result = await service.getMemberInfo();

    // Assert
    expect(result.data[0].cohort).toBe(2); // default value
  });
});

describe("calculate progress", () => {
  it("should calculate progress correctly", async () => {
    // Arrange
    vi.mocked(mockGithubApiClient.getTeams).mockResolvedValue([
      mockGithubTeams[0],
    ]);
    vi.mocked(mockGithubApiClient.getTeamMembers).mockResolvedValue([
      mockGithubMembers[0],
    ]);
    vi.mocked(mockGithubApiClient.getDirectoryTree).mockResolvedValue([
      { ...mockGithubTree[0], path: "problem1/algo.js", type: "blob" },
      { ...mockGithubTree[0], path: "problem2/algo.js", type: "blob" },
    ]);

    // Act
    const result = await service.getMemberInfo();

    // Assert
    const user = result.data[0];
    expect(user.progress).toBe((2 / mockGithubInfo.totalProblemCount) * 100);
  });

  it("should calculate progress as 0 when no submissions", async () => {
    // Arrange
    vi.mocked(mockGithubApiClient.getTeams).mockResolvedValue([
      mockGithubTeams[0],
    ]);
    vi.mocked(mockGithubApiClient.getTeamMembers).mockResolvedValue([
      mockGithubMembers[0],
    ]);
    vi.mocked(mockGithubApiClient.getDirectoryTree).mockResolvedValue([]);

    // Act
    const result = await service.getMemberInfo();

    // Assert
    const user = result.data[0];
    expect(user.progress).toBe(0);
  });
});

describe("calculate grade", () => {
  it("should calculate grade correctly", async () => {
    // Arrange
    vi.mocked(mockGithubApiClient.getTeams).mockResolvedValue([
      mockGithubTeams[0],
    ]);
    vi.mocked(mockGithubApiClient.getTeamMembers).mockResolvedValue([
      mockGithubMembers[0],
    ]);
    vi.mocked(mockGithubApiClient.getDirectoryTree).mockResolvedValue([
      { ...mockGithubTree[0], path: "problem1/algo.js", type: "blob" },
      { ...mockGithubTree[0], path: "problem2/algo.js", type: "blob" },
    ]);

    // Act
    const result = await service.getMemberInfo();

    // Assert
    const user = result.data[0];
    expect(user.grade).toBe(Grades.SMALL_TREE);
  });
});

describe("error handling", () => {
  it("should handle team member fetch failure", async () => {
    // Arrange
    vi.mocked(mockGithubApiClient.getTeams).mockResolvedValue([
      mockGithubTeams[0],
    ]);
    vi.mocked(mockGithubApiClient.getTeamMembers).mockRejectedValue(
      new Error("API Error"),
    );
    vi.mocked(mockGithubApiClient.getDirectoryTree).mockResolvedValue([]);

    // Act
    const result = await service.getMemberInfo();

    // Assert
    expect(result.data).toHaveLength(0);
  });

  it("should handle directory tree fetch failure", async () => {
    // Arrange
    vi.mocked(mockGithubApiClient.getTeams).mockResolvedValue([
      mockGithubTeams[0],
    ]);
    vi.mocked(mockGithubApiClient.getTeamMembers).mockResolvedValue([
      mockGithubMembers[0],
    ]);
    vi.mocked(mockGithubApiClient.getDirectoryTree).mockRejectedValue(
      new Error("API Error"),
    );

    // Act
    const result = await service.getMemberInfo();

    // Assert
    expect(result.data[0].submissions).toHaveLength(0);
  });
});
