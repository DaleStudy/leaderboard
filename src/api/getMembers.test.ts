import { beforeEach, expect, test, vi } from "vitest";
import { mock } from "vitest-mock-extended";
import { createFetchService } from "./services/fetch/fetchService";
import { createProcessService } from "./services/process/processService";
import { getMembers } from "./getMembers";
import { type Member } from "./services/types";

// Mock data
const mockMembers = mock<Member[]>();

// Mock services
const mockFetchMembers = vi.fn();
const mockFetchSubmissions = vi.fn();
const mockGetMembers = vi.fn();

vi.mock("./services/fetch/fetchService");
vi.mocked(createFetchService).mockReturnValue({
  fetchMembers: mockFetchMembers,
  fetchSubmissions: mockFetchSubmissions,
});

vi.mock("./services/process/processService");
vi.mocked(createProcessService).mockReturnValue({
  getMembers: mockGetMembers,
});

beforeEach(() => {
  vi.clearAllMocks();

  mockFetchMembers.mockResolvedValue([]);
  mockFetchSubmissions.mockResolvedValue([]);
  mockGetMembers.mockReturnValue(mockMembers);
});

test("fetch and process data", async () => {
  // Act
  const result = await getMembers();

  // Assert
  expect(mockFetchMembers).toHaveBeenCalledTimes(1);
  expect(mockFetchSubmissions).toHaveBeenCalledTimes(1);
  expect(mockGetMembers).toHaveBeenCalledTimes(1);
  expect(result).toEqual(mockMembers);
});

test("getMembers throws error when fetch fails", async () => {
  // Arrange
  mockFetchMembers.mockRejectedValue(new Error("Fetch failed"));

  // Act & Assert
  await expect(getMembers()).rejects.toThrow("Fetch failed");
});

test("getMembers handles process service errors", async () => {
  // Arrange
  mockGetMembers.mockImplementation(() => {
    throw new Error("Process failed");
  });

  // Act & Assert
  await expect(getMembers()).rejects.toThrow("Process failed");
});

test("getMembers called with correct parameters to process service", async () => {
  // Arrange
  const mockMembers = [{ id: "1", name: "Test" }];
  const mockSubmissions = [{ id: "1", score: 100 }];
  mockFetchMembers.mockResolvedValue(mockMembers);
  mockFetchSubmissions.mockResolvedValue(mockSubmissions);

  // Act
  await getMembers();

  // Assert
  expect(mockGetMembers).toHaveBeenCalledWith(mockMembers, mockSubmissions);
});
