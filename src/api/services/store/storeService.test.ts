import { test, expect, beforeEach, vi } from "vitest";
import { createFetchService } from "../fetch/fetchService";
import { createProcessService } from "../process/processService";
import { mockConfig, mockMembers } from "../common/fixtures";
import { fetchLeaderBoard } from "./storeService";

// Mock services
const mockFetchMembers = vi.fn();
const mockFetchSubmissions = vi.fn();
const mockAnalyzeMemberInfo = vi.fn();

vi.mock("../fetch/fetchService");
vi.mocked(createFetchService).mockReturnValue({
  fetchMembers: mockFetchMembers,
  fetchSubmissions: mockFetchSubmissions,
});

vi.mock("../process/processService");
vi.mocked(createProcessService).mockReturnValue({
  analyzeMemberInfo: mockAnalyzeMemberInfo,
});

beforeEach(() => {
  vi.clearAllMocks();

  mockFetchMembers.mockResolvedValue([]);
  mockFetchSubmissions.mockResolvedValue([]);
  mockAnalyzeMemberInfo.mockReturnValue(mockMembers);
});

test("should fetch and process data correctly", async () => {
  // Act
  const result = await fetchLeaderBoard(mockConfig);

  // Assert
  expect(mockFetchMembers).toHaveBeenCalledTimes(1);
  expect(mockFetchSubmissions).toHaveBeenCalledTimes(1);
  expect(mockAnalyzeMemberInfo).toHaveBeenCalledTimes(1);
  expect(result).toEqual(mockMembers);
});

test("fetchLeaderBoard should throw error when fetch fails", async () => {
  // Arrange
  mockFetchMembers.mockRejectedValue(new Error("Fetch failed"));

  // Act & Assert
  await expect(fetchLeaderBoard(mockConfig)).rejects.toThrow("Fetch failed");
});

test("fetchLeaderBoard should handle process service errors", async () => {
  // Arrange
  mockAnalyzeMemberInfo.mockImplementation(() => {
    throw new Error("Process failed");
  });

  // Act & Assert
  await expect(fetchLeaderBoard(mockConfig)).rejects.toThrow("Process failed");
});

test("fetchLeaderBoard should pass correct parameters to process service", async () => {
  // Arrange
  const mockMembers = [{ id: "1", name: "Test" }];
  const mockSubmissions = [{ id: "1", score: 100 }];
  mockFetchMembers.mockResolvedValue(mockMembers);
  mockFetchSubmissions.mockResolvedValue(mockSubmissions);

  // Act
  await fetchLeaderBoard(mockConfig);

  // Assert
  expect(mockAnalyzeMemberInfo).toHaveBeenCalledWith(
    mockMembers,
    mockSubmissions,
  );
});
