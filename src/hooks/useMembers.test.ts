import { act, renderHook, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { faker } from "@faker-js/faker";

import { type Member } from "../api/services/types";
import useMembers from "./useMembers";
import { problems } from "../api/constants/problems";

function createMockMember(custom: Partial<Member> = {}): Member {
  const cohort = faker.number.int({ min: 1, max: 10 });
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    cohorts: [cohort],
    profileUrl: faker.internet.url(),
    progress: faker.number.int({ min: 0, max: 100 }),
    grade: faker.helpers.arrayElement([
      "SEED",
      "SPROUT",
      "LEAF",
      "BRANCH",
      "FRUIT",
      "TREE",
    ]),
    solvedProblems: faker.helpers.arrayElements(
      problems,
      faker.number.int({ min: 0, max: 5 }),
    ),
    ...custom,
  };
}

test("fetch member info successfully and update state", async () => {
  const expectedMembers: Member[] = [
    createMockMember({ cohorts: [1] }),
    createMockMember({ cohorts: [2] }),
  ];

  const getMembers = vi.fn().mockResolvedValue(expectedMembers);

  const { result } = renderHook(() => useMembers({ getMembers }));

  // Initial state validation
  expect(result.current.isLoading).toBe(true);
  expect(result.current.members).toEqual([]);
  expect(result.current.error).toBeNull();
  expect(result.current.totalCohorts).toBe(0);

  // Wait for the hook to finish fetching data
  await waitFor(() => expect(result.current.isLoading).toBe(false));

  // Validate the updated state
  expect(result.current.members).toEqual(expectedMembers);
  expect(result.current.totalCohorts).toBe(2);
  expect(result.current.error).toBeNull();
  expect(getMembers).toHaveBeenCalledTimes(1);
});

test("handle error when fetching member info fails", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});

  const mockError = new Error("Fetch error");
  const getMembers = vi.fn().mockRejectedValue(mockError);

  const { result } = renderHook(() => useMembers({ getMembers }));

  // Initial state validation
  expect(result.current.isLoading).toBe(true);
  expect(result.current.members).toEqual([]);
  expect(result.current.error).toBeNull();

  // Wait for the hook to handle the error
  await waitFor(() => expect(result.current.isLoading).toBe(false));

  // Validate the state after error
  expect(result.current.members).toEqual([]);
  expect(result.current.error).toEqual(mockError);
  expect(getMembers).toHaveBeenCalledTimes(1);

  vi.mocked(console.error).mockRestore();
});

test("filter members by name and cohort", async () => {
  const expectedMembers: Member[] = [
    createMockMember({ name: "John Doe", cohorts: [1] }),
    createMockMember({ name: "Jane Doe", cohorts: [2] }),
    createMockMember({ name: "Alice Cooper", cohorts: [1] }),
  ];
  const [johnDoe1, janeDoe1, aliceCooper2] = expectedMembers;

  const getMembers = vi.fn().mockResolvedValue(expectedMembers);

  const { result } = renderHook(() => useMembers({ getMembers }));

  // Wait for members to load
  await waitFor(() => expect(result.current.isLoading).toBe(false));

  // Initial state
  expect(result.current.members).toEqual(expectedMembers);

  // Act: Apply name filter
  act(() => {
    result.current.setFilter({
      name: "Doe",
      cohort: null,
    });
  });

  expect(result.current.members).toEqual([johnDoe1, janeDoe1]);

  // Act: Apply cohort filter
  act(() => {
    result.current.setFilter({ name: "", cohort: 1 });
  });

  expect(result.current.members).toEqual([johnDoe1, aliceCooper2]);

  // Act: Apply both name and cohort filter
  act(() => {
    result.current.setFilter({ name: "John", cohort: 1 });
  });

  expect(result.current.members).toEqual([johnDoe1]);
});

test("total cohorts calculated correctly", async () => {
  const expectedMembers: Member[] = [
    createMockMember({ cohorts: [1] }),
    createMockMember({ cohorts: [2] }),
    createMockMember({ cohorts: [2] }),
    createMockMember({ cohorts: [3] }),
    createMockMember({ cohorts: [3] }),
  ];

  const getMembers = vi.fn().mockResolvedValue(expectedMembers);

  const { result } = renderHook(() => useMembers({ getMembers }));

  await waitFor(() => expect(result.current.isLoading).toBe(false));

  expect(result.current.totalCohorts).toBe(3);
});

test("filter members by name case-insensitively", async () => {
  const expectedMembers: Member[] = [
    createMockMember({ name: "John Doe", cohorts: [1] }),
    createMockMember({ name: "jane doe", cohorts: [2] }),
    createMockMember({ name: "ALICE Cooper", cohorts: [3] }),
  ];
  const [johnDoe, janeDoe, aliceCooper] = expectedMembers;

  const getMembers = vi.fn().mockResolvedValue(expectedMembers);

  const { result } = renderHook(() => useMembers({ getMembers }));

  // Wait for members to load
  await waitFor(() => expect(result.current.isLoading).toBe(false));

  // Initial state
  expect(result.current.members).toEqual(expectedMembers);

  // Act: Apply case-insensitive name filter
  act(() => {
    result.current.setFilter({
      name: "doe",
      cohort: null,
    });
  });

  expect(result.current.members).toEqual([johnDoe, janeDoe]);

  // Act: Apply case-insensitive name and cohort filter
  act(() => {
    result.current.setFilter({
      name: "aLiCe",
      cohort: null,
    });
  });

  expect(result.current.members).toEqual([aliceCooper]);

  // Act: Apply case-insensitive partial name filter
  act(() => {
    result.current.setFilter({
      name: "JoHn",
      cohort: null,
    });
  });

  expect(result.current.members).toEqual([johnDoe]);
});
