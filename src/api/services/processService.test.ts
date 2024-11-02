import { test, expect } from "vitest";
import { createProcessService } from "./processService";
import { mockConfig, mockMembers, mockSubmissions } from "./fixtures";
import { Grades } from "../type";

const processService = createProcessService(mockConfig);

test("processService should initialize members correctly", () => {
  // Act
  const result = processService.analyzeMemberInfo(mockMembers, []);

  // Assert
  expect(result.total).toBe(mockMembers.length);
  result.data.forEach((member) => {
    expect(member).toEqual({
      ...mockMembers.find((m) => m.id === member.id),
      totalSubmissions: 0,
      submissions: [],
      progress: 0,
      grade: Grades.SEED,
    });
  });
});

test("processService should calculate submissions and progress correctly", () => {
  // Act
  const result = processService.analyzeMemberInfo(mockMembers, mockSubmissions);

  // Assert
  const algoInfo = result.data.find((m) => m.id === "algo")!; // 2
  const daleInfo = result.data.find((m) => m.id === "dale")!; // 1

  // number of submissions
  expect(algoInfo.totalSubmissions).toBe(2);
  expect(daleInfo.totalSubmissions).toBe(1);

  // progress percentage
  expect(algoInfo.progress).toBe(50); // 2/4 * 100
  expect(daleInfo.progress).toBe(25); // 1/4 * 100
});

test("processService should handle duplicate problem submissions", () => {
  // Arrange
  const duplicateSubmissions = [
    ...mockSubmissions,
    {
      memberId: "algo",
      problemTitle: "problem1", // duplicate
      language: "ts",
    },
  ];

  // Act
  const result = processService.analyzeMemberInfo(
    mockMembers,
    duplicateSubmissions,
  );

  // Assert
  const algoInfo = result.data.find((m) => m.id === "algo")!;
  expect(algoInfo.totalSubmissions).toBe(2); // duplicates should be ignored
  expect(algoInfo.submissions).toHaveLength(3); // but should be added to submissions
});

test("processService should assign correct grades based on submissions", () => {
  // Arrange
  const submissions = [
    // algo
    { memberId: "algo", problemTitle: "problem1", language: "js" },
    { memberId: "algo", problemTitle: "problem2", language: "js" },
    { memberId: "algo", problemTitle: "problem3", language: "js" },
    // dale
    { memberId: "dale", problemTitle: "problem1", language: "py" },
  ];

  // Act
  const result = processService.analyzeMemberInfo(mockMembers, submissions);

  // Assert
  const algoInfo = result.data.find((m) => m.id === "algo")!;
  const daleInfo = result.data.find((m) => m.id === "dale")!;

  // mockConfig gradeThresholds: BIG_TREE(3), SMALL_TREE(2), SPROUT(1), SEED(0)
  expect(algoInfo.grade).toBe(Grades.BIG_TREE); // large or equal to 3
  expect(daleInfo.grade).toBe(Grades.SPROUT); // large or equal to 1
});

test("processService should calculate correct progress percentages", () => {
  // Arrange
  const submissions = Array.from({ length: 4 }, (_, i) => ({
    memberId: "algo",
    problemTitle: `problem${i + 1}`, // 4 of 4
    language: "js",
  }));

  // Act
  const result = processService.analyzeMemberInfo(mockMembers, submissions);

  // Assert
  const algoInfo = result.data.find((m) => m.id === "algo")!;
  expect(algoInfo.progress).toBe(100); // 4/4 * 100
  expect(algoInfo.grade).toBe(Grades.BIG_TREE);
});
