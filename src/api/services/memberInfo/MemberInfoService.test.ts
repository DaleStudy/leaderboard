import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
  Mock,
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

describe("MemberInfoService", () => {
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
      (mockGithubApiClient.getTeams as Mock).mockResolvedValue(mockGithubTeams);
      (mockGithubApiClient.getTeamMembers as Mock).mockResolvedValue(
        mockGithubMembers, // 2 members
      );
      (mockGithubApiClient.getDirectoryTree as Mock as Mock).mockResolvedValue(
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
      (mockGithubApiClient.getTeams as Mock).mockRejectedValue(
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
      (mockGithubApiClient.getTeams as Mock).mockResolvedValue(mockGithubTeams);
      (mockGithubApiClient.getTeamMembers as Mock).mockResolvedValue([]);

      // Act
      await service.getMemberInfo();

      // Assert
      expect(mockGithubApiClient.getTeamMembers as Mock).toHaveBeenCalledTimes(
        2,
      ); // only algodale01 and algodale02. another-team should be filtered out
      expect(
        mockGithubApiClient.getTeamMembers as Mock,
      ).not.toHaveBeenCalledWith(mockGithubInfo.orgName, "another-team");
    });
  });

  describe("submission parsing", () => {
    it("should correctly parse valid submission paths", async () => {
      // Arrange
      (mockGithubApiClient.getTeams as Mock).mockResolvedValue([
        mockGithubTeams[0],
      ]);
      (mockGithubApiClient.getTeamMembers as Mock).mockResolvedValue([
        mockGithubMembers[0],
      ]);
      (mockGithubApiClient.getDirectoryTree as Mock).mockResolvedValue([
        { path: "problem1/algo.js", type: "blob" },
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
      (mockGithubApiClient.getTeams as Mock).mockResolvedValue([
        mockGithubTeams[0],
      ]);
      (mockGithubApiClient.getTeamMembers as Mock).mockResolvedValue([
        mockGithubMembers[0],
      ]);
      (mockGithubApiClient.getDirectoryTree as Mock).mockResolvedValue([
        { path: "invalid/path/format", type: "blob" },
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
      (mockGithubApiClient.getTeams as Mock).mockResolvedValue([
        { name: "algodale03" },
      ]);
      (mockGithubApiClient.getTeamMembers as Mock).mockResolvedValue([
        mockGithubMembers[0],
      ]);
      (mockGithubApiClient.getDirectoryTree as Mock).mockResolvedValue([]);

      // Act
      const result = await service.getMemberInfo();

      // Assert
      expect(result.data[0].cohort).toBe(3);
    });

    // TODO: Remove this when cohort number is applied on 'leetcode' team
    it("should use default cohort number for invalid team names", async () => {
      // Arrange
      (mockGithubApiClient.getTeams as Mock).mockResolvedValue([
        { name: "algodale" },
      ]);
      (mockGithubApiClient.getTeamMembers as Mock).mockResolvedValue([
        mockGithubMembers[0],
      ]);
      (mockGithubApiClient.getDirectoryTree as Mock).mockResolvedValue([]);

      // Act
      const result = await service.getMemberInfo();

      // Assert
      expect(result.data[0].cohort).toBe(2); // default value
    });
  });

  describe("error handling", () => {
    it("should handle team member fetch failure", async () => {
      // Arrange
      (mockGithubApiClient.getTeams as Mock).mockResolvedValue([
        mockGithubTeams[0],
      ]);
      (mockGithubApiClient.getTeamMembers as Mock).mockRejectedValue(
        new Error("API Error"),
      );
      (mockGithubApiClient.getDirectoryTree as Mock).mockResolvedValue([]);

      // Act
      const result = await service.getMemberInfo();

      // Assert
      expect(result.data).toHaveLength(0);
    });

    it("should handle directory tree fetch failure", async () => {
      // Arrange
      (mockGithubApiClient.getTeams as Mock).mockResolvedValue([
        mockGithubTeams[0],
      ]);
      (mockGithubApiClient.getTeamMembers as Mock).mockResolvedValue([
        mockGithubMembers[0],
      ]);
      (mockGithubApiClient.getDirectoryTree as Mock).mockRejectedValue(
        new Error("API Error"),
      );

      // Act
      const result = await service.getMemberInfo();

      // Assert
      expect(result.data[0].submissions).toHaveLength(0);
    });
  });
});
