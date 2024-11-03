import { faker } from "@faker-js/faker";
import { renderHook, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import type { MemberInfo } from "../api";
import useMembers, { type Member } from "./useMembers";

test("fetch member info successfully and update state", async () => {
  const mockMemberInfos: MemberInfo[] = Array.from({ length: 5 }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    cohort: faker.number.int({ min: 1, max: 10 }),
    profileUrl: faker.internet.url(),
    totalSubmissions: faker.number.int({ min: 0, max: 100 }),
    progress: faker.number.int({ min: 0, max: 100 }),
    grade: faker.helpers.arrayElement([
      "SEED",
      "SPROUT",
      "SMALL_TREE",
      "BIG_TREE",
    ]),
    submissions: Array.from(
      { length: faker.number.int({ min: 0, max: 5 }) },
      (): MemberInfo["submissions"][number] => ({
        problemTitle: faker.lorem.words(3),
        memberId: faker.string.uuid(),
        language: faker.helpers.arrayElement(["javascript", "python", "java"]),
      }),
    ),
  }));

  const expectedMembers: Member[] = mockMemberInfos.map((memberInfo) => ({
    id: memberInfo.id,
    name: memberInfo.name,
    cohort: memberInfo.cohort,
    profileUrl: memberInfo.profileUrl,
    progress: memberInfo.progress,
    grade: memberInfo.grade,
    solvedProblems: memberInfo.submissions.map(
      (submission) => submission.problemTitle,
    ),
  }));

  const getMembers = vi.fn().mockResolvedValue(mockMemberInfos);

  const { result } = renderHook(() => useMembers({ getMembers }));

  // Initial state validation
  expect(result.current.isLoading).toBe(true);
  expect(result.current.members).toBeNull();
  expect(result.current.error).toBeNull();

  // Wait for the hook to finish fetching data
  await waitFor(() => expect(result.current.isLoading).toBe(false));

  // Validate the updated state
  expect(result.current.members).toEqual(expectedMembers);
  expect(result.current.error).toBeNull();
  expect(getMembers).toHaveBeenCalledTimes(1);
});

test("handle error when fetching member info fails", async () => {
  const mockError = new Error("Fetch error");
  const getMembers = vi.fn().mockRejectedValue(mockError);

  // Use the hook with the mocked getMembers function that rejects
  const { result } = renderHook(() => useMembers({ getMembers }));

  // Initial state validation
  expect(result.current.isLoading).toBe(true);
  expect(result.current.members).toBeNull();
  expect(result.current.error).toBeNull();

  // Wait for the hook to handle the error
  await waitFor(() => expect(result.current.isLoading).toBe(false));

  // Validate the state after error
  expect(result.current.members).toBeNull();
  expect(result.current.error).toEqual(mockError);
  expect(getMembers).toHaveBeenCalledTimes(1);
});
