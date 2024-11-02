import { test, expect, beforeEach, vi } from "vitest";
import { createStoreService } from "./storeService";
import { mockConfig, mockMembers } from "../common/fixtures";
import { Grades } from "../../type";

// Mock services
const mockFetchMembers = vi.fn();
const mockFetchSubmissions = vi.fn();
const mockAnalyzeMemberInfo = vi.fn();

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};
Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

vi.mock("../fetch/fetchService", () => ({
  createFetchService: () => ({
    fetchMembers: mockFetchMembers,
    fetchSubmissions: mockFetchSubmissions,
  }),
}));

vi.mock("../process/processService", () => ({
  createProcessService: () => ({
    analyzeMemberInfo: mockAnalyzeMemberInfo,
  }),
}));

let storeService: Awaited<ReturnType<typeof createStoreService>>;

beforeEach(async () => {
  vi.clearAllMocks();

  mockFetchMembers.mockResolvedValue([]);
  mockFetchSubmissions.mockResolvedValue([]);
  mockAnalyzeMemberInfo.mockReturnValue(mockMembers);

  mockLocalStorage.getItem.mockReturnValue(null);

  storeService = await createStoreService(mockConfig);
});

test("getData should fetch data when store is empty", async () => {
  // Act
  const result = await storeService.getData();

  // Assert
  expect(mockFetchMembers).toHaveBeenCalledTimes(1);
  expect(mockFetchSubmissions).toHaveBeenCalledTimes(1);
  expect(mockAnalyzeMemberInfo).toHaveBeenCalledTimes(1);
  expect(result).toEqual(mockMembers);
});

test("getData should return data without fetching", async () => {
  // Arrange
  await storeService.getData(); // Initial fetch

  // Act
  const result = await storeService.getData(); // Second call

  // Assert
  expect(mockFetchMembers).toHaveBeenCalledTimes(1); // Should not be called twice
  expect(result).toEqual(mockMembers);
});

test("getData should use localStorage data when available and not expired", async () => {
  // Arrange
  const cachedData = {
    data: mockMembers,
    timestamp: Date.now(),
  };
  mockLocalStorage.getItem.mockReturnValue(JSON.stringify(cachedData));

  // Act
  const result = await storeService.getData();

  // Assert
  expect(mockFetchMembers).not.toHaveBeenCalled();
  expect(result).toEqual(mockMembers);
});

test("getData should fetch new data when cache is expired", async () => {
  // Arrange
  const expiredCache = {
    data: mockMembers,
    timestamp: Date.now() - 1000 * 60 * 60 * 10, // 10 hours ago
  };
  mockLocalStorage.getItem.mockReturnValue(JSON.stringify(expiredCache));

  // Act
  const result = await storeService.getData();

  // Assert
  expect(mockLocalStorage.removeItem).toHaveBeenCalled();
  expect(mockFetchMembers).toHaveBeenCalled();
  expect(result).toEqual(mockMembers);
});

test("getData should fetch new data when localStorage throws error", async () => {
  // Arrange
  mockLocalStorage.getItem.mockImplementation(() => {
    throw new Error("some localStorage error");
  });

  // Act
  const result = await storeService.getData();

  // Assert
  expect(mockFetchMembers).toHaveBeenCalled();
  expect(result).toEqual(mockMembers);
});

test("getData should fetch if requested hard refresh", async () => {
  // Arrange
  await storeService.getData(); // Initial fetch

  // Act
  await storeService.getData(true); // Hard refresh

  // Assert
  expect(mockFetchMembers).toHaveBeenCalledTimes(2);
});

test("getMemberById should return filtered members by ID", async () => {
  // Arrange
  await storeService.getData(); // Ensure data is loaded

  // Act
  const result = await storeService.getMemberById("algo");

  // Assert
  expect(result.length).toBe(1);
  expect(result).toEqual([mockMembers.find((member) => member.id === "algo")]);
});

test("getMemberById should handle case-insensitive search", async () => {
  // Act
  const result = await storeService.getMemberById("ALGO");

  // Assert
  expect(result.length).toBe(1);
  expect(result[0].id).toBe("algo");
});

test("getMemberById should return empty array for non-existing ID", async () => {
  // Act
  const result = await storeService.getMemberById("non-existing");

  // Assert
  expect(result).toEqual([]);
});

test("getMemberByCohort should return filtered members by cohort", async () => {
  // Act
  const result = await storeService.getMemberByCohort(1);

  // Assert
  expect(result).toEqual(mockMembers.filter((m) => m.cohort === 1));
});

test("getMemberByCohort should return empty array for non-existing cohort", async () => {
  // Act
  const result = await storeService.getMemberByCohort(999999);

  // Assert
  expect(result).toEqual([]);
});

test("getMemberByGrade should return filtered members by grade", async () => {
  // Act
  const result = await storeService.getMemberByGrade(Grades.BIG_TREE);

  // Assert
  expect(result).toEqual(
    mockMembers.filter((m) => m.grade === Grades.BIG_TREE),
  );
});

test("getMemberByGrade should return empty array for grade with no members", async () => {
  // Act
  const result = await storeService.getMemberByGrade(Grades.SEED);

  // Assert
  expect(result).toEqual([]); // No mock members with SEED grade
});

test("getData should throw error when fetch fails", async () => {
  // Arrange
  mockFetchMembers.mockRejectedValue(new Error("Fetch failed"));

  // Act & Assert
  await expect(storeService.getData()).rejects.toThrow("Fetch failed");
});

test("getData should handle process service errors", async () => {
  // Arrange
  mockAnalyzeMemberInfo.mockImplementation(() => {
    throw new Error("Process failed");
  });

  // Act & Assert
  await expect(storeService.getData()).rejects.toThrow("Process failed");
});
