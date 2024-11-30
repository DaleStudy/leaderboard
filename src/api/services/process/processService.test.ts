import { faker } from "@faker-js/faker";
import { expect, test } from "vitest";

import { problems } from "../../../constants/problems";
import type { Config } from "../../config/types";
import { Grade } from "../common/types";
import { createProcessService } from "./processService";

import {
  createMockMemberIdentity,
  createMockSubmission,
  createMockSubmissions,
  dummyConfig,
} from "../common/fixtures";

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
  const member = createMockMemberIdentity();
  const targetSubmissions = createMockSubmissions(member.id, totalSubmissions);
  const dummySubmissions = createMockSubmissions(
    "dummyMemberId",
    faker.number.int({ min: 1, max: 10 }),
  );

  // Act
  const members = processService.getMembers(
    [member, createMockMemberIdentity()],
    [...targetSubmissions, ...dummySubmissions],
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
  const memberIdentity = createMockMemberIdentity();
  const sameProblemTitle = faker.helpers.arrayElement(problems).title;
  const duplicateSubmissions = [
    createMockSubmission({
      memberId: memberIdentity.id,
      problemTitle: sameProblemTitle,
    }),
    createMockSubmission({
      memberId: memberIdentity.id,
      problemTitle: sameProblemTitle,
    }),
  ];

  // Act
  const solvedProblems = processService.getMembers(
    [memberIdentity],
    duplicateSubmissions,
  )[0].solvedProblems;

  // Assert
  expect(solvedProblems.length).toBe(1);
});

test.each([
  [1, Grade.SEED],
  [2, Grade.SPROUT],
  [3, Grade.SPROUT],
  [4, Grade.LEAF],
  [5, Grade.LEAF],
  [6, Grade.BRANCH],
  [7, Grade.BRANCH],
  [8, Grade.FRUIT],
  [9, Grade.FRUIT],
  [10, Grade.TREE],
  [11, Grade.TREE],
])(
  "assign grades based on submissions: totalSubmissions: %i, expectedGrade: %s",
  (totalSubmissions, expectedGrade) => {
    // Arrange
    const config: Partial<Config> = {
      gradeThresholds: [
        [Grade.SEED, 0],
        [Grade.SPROUT, 2],
        [Grade.LEAF, 4],
        [Grade.BRANCH, 6],
        [Grade.FRUIT, 8],
        [Grade.TREE, 10],
      ],
    };
    const processService = createMockProcessService(config);
    const member = createMockMemberIdentity();
    const submissions = createMockSubmissions(member.id, totalSubmissions);

    // Act
    const { grade } = processService.getMembers([member], submissions)[0];

    // Assert
    expect(grade).toBe(expectedGrade);
  },
);
