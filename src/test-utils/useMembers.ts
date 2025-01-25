import { faker } from "@faker-js/faker";
import { mock } from "vitest-mock-extended";
import type { Member } from "../api/services/types";
import { vi } from "vitest";

export const mockUseMembers = {
  members: [],
  totalCohorts: 0,
  isLoading: false,
  error: null,
  filter: { name: "", cohort: null },
  pagination: { current: 0, total: 0 },
  setFilter: vi.fn(),
};

export function createMockMember({
  id = faker.internet.username(),
  name = faker.person.fullName(),
  cohorts = [faker.number.int({ min: 1, max: 9 })],
  grade = faker.helpers.arrayElement([
    "SEED",
    "SPROUT",
    "LEAF",
    "BRANCH",
    "FRUIT",
    "TREE",
  ]),
  profileUrl = faker.internet.url(),
  solvedProblems = [],
}: Partial<Member> = {}) {
  return mock<Member>({
    id,
    name,
    cohorts,
    grade,
    profileUrl,
    solvedProblems,
  });
}
