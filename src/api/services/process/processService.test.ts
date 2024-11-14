import { expect, test } from "vitest";
import { Grades } from "../../types";
import { mockConfig, mockMembers, mockSubmissions } from "../common/fixtures";
import { createProcessService } from "./processService";

const processService = createProcessService(mockConfig);

test("initialize members", () => {
  // Act
  const result = processService.getMembers(mockMembers, []);

  // Assert
  expect(result.length).toBe(mockMembers.length);
  result.forEach((member) => {
    expect(member).toEqual({
      ...mockMembers.find((m) => m.id === member.id),
      solvedProblems: [],
      progress: 0,
      grade: Grades.SEED,
    });
  });
});

test("calculate submissions and progress", () => {
  // Act
  const result = processService.getMembers(mockMembers, mockSubmissions);

  // Assert
  const algoInfo = result.find((m) => m.id === "algo")!; // 2
  const daleInfo = result.find((m) => m.id === "dale")!; // 1

  // progress percentage
  expect(algoInfo.progress).toBe(50); // 2/4 * 100
  expect(daleInfo.progress).toBe(25); // 1/4 * 100
});

test("remove duplicate problem submissions", () => {
  // Arrange
  const duplicateSubmissions = [
    {
      memberId: "algo",
      problemTitle: "duplicated-problem",
      language: "ts",
    },
    {
      memberId: "algo",
      problemTitle: "duplicated-problem",
      language: "js",
    },
  ];

  // Act
  const result = processService.getMembers(mockMembers, duplicateSubmissions);

  // Assert
  const algo = result.find((m) => m.id === "algo")!;
  expect(algo.solvedProblems.length).toBe(1); // duplicates should be ignored
});

test("assign correct grades based on submissions", () => {
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
  const result = processService.getMembers(mockMembers, submissions);

  // Assert
  const algoInfo = result.find((m) => m.id === "algo")!;
  const daleInfo = result.find((m) => m.id === "dale")!;

  // mockConfig gradeThresholds: BIG_TREE(3), SMALL_TREE(2), SPROUT(1), SEED(0)
  expect(algoInfo.grade).toBe(Grades.BIG_TREE); // large or equal to 3
  expect(daleInfo.grade).toBe(Grades.SPROUT); // large or equal to 1
});

test("calculate correct progress percentages", () => {
  // Arrange
  const submissions = Array.from({ length: 4 }, (_, i) => ({
    memberId: "algo",
    problemTitle: `problem${i + 1}`, // 4 of 4
    language: "js",
  }));

  // Act
  const result = processService.getMembers(mockMembers, submissions);

  // Assert
  const algoInfo = result.find((m) => m.id === "algo")!;
  expect(algoInfo.progress).toBe(100); // 4/4 * 100
  expect(algoInfo.grade).toBe(Grades.BIG_TREE);
});
