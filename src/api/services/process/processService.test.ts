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
  dummyStudyConfig,
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
    study: {
      ...dummyStudyConfig,
      totalProblemCount,
    },
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
  [0, Grade.SEED],
  [1, Grade.SEED],
  [2, Grade.SPROUT],
  [3, Grade.SPROUT],
  [4, Grade.SMALL_TREE],
  [5, Grade.SMALL_TREE],
  [6, Grade.BIG_TREE],
  [7, Grade.BIG_TREE],
])(
  "assign grades based on submissions: totalSubmissions: %i, expectedGrade: %s",
  (totalSubmissions, expectedGrade) => {
    // Arrange
    const config: Partial<Config> = {
      study: {
        ...dummyStudyConfig,
        gradeThresholds: [
          [Grade.SEED, 0],
          [Grade.SPROUT, 2],
          [Grade.SMALL_TREE, 4],
          [Grade.BIG_TREE, 6],
        ],
      },
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
