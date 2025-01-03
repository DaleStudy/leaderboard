import { faker } from "@faker-js/faker";
import { expect, test } from "vitest";
import { mock } from "vitest-mock-extended";

import { problems } from "../../constants/problems";
import type { Config } from "../../config/types";
import type { Grade, MemberIdentity, Submission } from "../types";
import { createProcessService } from "./processService";

// Mock data
const dummyConfig = {
  totalProblemCount: 6,
  gradeThresholds: [
    ["TREE", 5],
    ["FRUIT", 4],
    ["BRANCH", 3],
    ["LEAF", 2],
    ["SPROUT", 1],
    ["SEED", 0],
  ] as [Grade, number][],
  gitHubToken: "test-token",
};
const mockMemberIdentity = mock<MemberIdentity>();
const mockSubmission = mock<Submission>();

const createMockProcessService = (customConfig: Partial<Config> = {}) => {
  return createProcessService({
    ...dummyConfig,
    ...customConfig,
  });
};

test("calculate submissions and progress", () => {
  // Arrange
  const totalProblemCount = 75;
  const totalSubmissions = faker.number.int({ min: 1, max: 75 });
  const processService = createMockProcessService({
    totalProblemCount,
  });
  const member = mockMemberIdentity;
  const targetSubmissions = Array.from(
    { length: totalSubmissions },
    (_, idx) => ({
      ...mockSubmission,
      memberId: member.id,
      problemTitle: problems[idx].title,
      language: faker.helpers.arrayElement(["js", "ts", "py"]),
    }),
  );

  const submissionsOfOtherMember = Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, idx) => ({
      ...mockSubmission,
      memberId: "OtherMemberId",
      problemTitle: problems[idx].title,
    }),
  );

  // Act
  const members = processService.getMembers(
    [member, mockMemberIdentity],
    [...targetSubmissions, ...submissionsOfOtherMember],
  );
  const { progress } = members.find((member) => member.id === member.id)!;

  // Assert
  expect(progress).toBe(
    Math.round((totalSubmissions / totalProblemCount) * 100 * 10) / 10,
  );
});

test("remove duplicate problem submissions", () => {
  // Arrange
  const processService = createMockProcessService();
  const memberIdentity = mockMemberIdentity;
  const sameProblemTitle = faker.helpers.arrayElement(problems).title;
  const duplicateSubmissions = [
    {
      ...mockSubmission,
      memberId: memberIdentity.id,
      problemTitle: sameProblemTitle,
    },
    {
      ...mockSubmission,
      memberId: memberIdentity.id,
      problemTitle: sameProblemTitle,
    },
  ];

  // Act
  const solvedProblems = processService.getMembers(
    [memberIdentity],
    duplicateSubmissions,
  )[0].solvedProblems;

  // Assert
  expect(solvedProblems.length).toBe(1);
});

test("remove member with no submissions", () => {
  // Arrange
  const processService = createMockProcessService();
  const memberIdentity = mockMemberIdentity; // no submissions

  // Act
  const members = processService.getMembers([memberIdentity], []);

  // Assert
  expect(members).toHaveLength(0);
});

test.each([
  [1, "SEED"],
  [2, "SPROUT"],
  [3, "SPROUT"],
  [4, "LEAF"],
  [5, "LEAF"],
  [6, "BRANCH"],
  [7, "BRANCH"],
  [8, "FRUIT"],
  [9, "FRUIT"],
  [10, "TREE"],
  [11, "TREE"],
])(
  "assign grades based on submissions: totalSubmissions: %i, expectedGrade: %s",
  (totalSubmissions, expectedGrade) => {
    // Arrange
    const config: Partial<Config> = {
      gradeThresholds: [
        ["SEED", 0],
        ["SPROUT", 2],
        ["LEAF", 4],
        ["BRANCH", 6],
        ["FRUIT", 8],
        ["TREE", 10],
      ],
    };
    const processService = createMockProcessService(config);
    const member = mockMemberIdentity;
    const submissions = Array.from({ length: totalSubmissions }, (_, idx) => ({
      ...mockSubmission,
      memberId: member.id,
      problemTitle: problems[idx].title,
    }));

    // Act
    const { grade } = processService.getMembers([member], submissions)[0];

    // Assert
    expect(grade).toBe(expectedGrade);
  },
);
