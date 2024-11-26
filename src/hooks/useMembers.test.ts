import { act, renderHook, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import { createMockMember } from "../api/services/common/fixtures";
import { type Member } from "../api/services/common/types";
import useMembers from "./useMembers";

test("fetch member info successfully and update state", async () => {
  const expectedMembers: Member[] = [
    createMockMember({ cohort: 1 }),
    createMockMember({ cohort: 2 }),
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
});

test("filter members by name and cohort", async () => {
  const expectedMembers: Member[] = [
    createMockMember({ name: "John Doe", cohort: 1 }),
    createMockMember({ name: "Jane Doe", cohort: 2 }),
    createMockMember({ name: "Alice Cooper", cohort: 1 }),
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
    createMockMember({ cohort: 1 }),
    createMockMember({ cohort: 2 }),
    createMockMember({ cohort: 2 }),
    createMockMember({ cohort: 3 }),
    createMockMember({ cohort: 3 }),
  ];

  const getMembers = vi.fn().mockResolvedValue(expectedMembers);

  const { result } = renderHook(() => useMembers({ getMembers }));

  await waitFor(() => expect(result.current.isLoading).toBe(false));

  expect(result.current.totalCohorts).toBe(3);
});
