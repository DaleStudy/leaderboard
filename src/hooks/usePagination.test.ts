import { act, renderHook } from "@testing-library/react";
import { expect, test } from "vitest";
import usePagination from "./usePagination";

test("initial state is set correctly", () => {
  const { result } = renderHook(() => usePagination({ totalItems: [] }));

  expect(result.current.currentPage).toBe(0);
  expect(result.current.totalPages).toBe(0);
  expect(result.current.items).toEqual([]);
});

test("pagination calculates totalPages correctly", () => {
  const items = Array.from({ length: 25 }, (_, i) => i + 1);
  const { result } = renderHook(() =>
    usePagination({ totalItems: items, pageSize: 10 }),
  );

  expect(result.current.totalPages).toBe(3);
});

test("next and previous page navigation works", () => {
  const items = Array.from({ length: 25 }, (_, i) => i + 1);
  const { result } = renderHook(() =>
    usePagination({ totalItems: items, pageSize: 10 }),
  );

  act(() => {
    result.current.goNext();
  });

  expect(result.current.currentPage).toBe(2);

  act(() => {
    result.current.goPrevious();
  });

  expect(result.current.currentPage).toBe(1);
});

test("items are sliced correctly based on current page", () => {
  const items = Array.from({ length: 25 }, (_, i) => i + 1);
  const { result } = renderHook(() =>
    usePagination({ totalItems: items, pageSize: 10 }),
  );

  expect(result.current.items).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  act(() => {
    result.current.goNext();
  });

  expect(result.current.items).toEqual([
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]);

  act(() => {
    result.current.goNext();
  });

  expect(result.current.items).toEqual([21, 22, 23, 24, 25]);
});

test("next page does not exceed totalPages", () => {
  const items = Array.from({ length: 25 }, (_, i) => i + 1);
  const { result } = renderHook(() =>
    usePagination({ totalItems: items, pageSize: 10 }),
  );

  act(() => {
    result.current.goNext();
    result.current.goNext();
    result.current.goNext();
  });

  expect(result.current.currentPage).toBe(3);
});

test("previous page does not go below 1", () => {
  const items = Array.from({ length: 25 }, (_, i) => i + 1);
  const { result } = renderHook(() =>
    usePagination({ totalItems: items, pageSize: 10 }),
  );

  act(() => {
    result.current.goPrevious();
  });

  expect(result.current.currentPage).toBe(1);
});

test("current page resets to 1 when totalItems changes", () => {
  const items1 = Array.from({ length: 25 }, (_, i) => i + 1);
  const items2 = Array.from({ length: 10 }, (_, i) => i + 1);
  const { result, rerender } = renderHook(
    ({ totalItems }) => usePagination({ totalItems, pageSize: 10 }),
    { initialProps: { totalItems: items1 } },
  );

  act(() => {
    result.current.goNext();
  });

  expect(result.current.currentPage).toBe(2);

  rerender({ totalItems: items2 });

  expect(result.current.currentPage).toBe(1);
  expect(result.current.totalPages).toBe(1);
  expect(result.current.items).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test("current page and total page reset to 0 when totalItems is empty", () => {
  const items = Array.from({ length: 25 }, (_, i) => i + 1);
  const { result, rerender } = renderHook(
    ({ totalItems }) => usePagination({ totalItems, pageSize: 10 }),
    { initialProps: { totalItems: items } },
  );

  act(() => {
    result.current.goNext();
  });

  expect(result.current.currentPage).toBe(2);

  rerender({ totalItems: [] });

  expect(result.current.currentPage).toBe(0);
  expect(result.current.totalPages).toBe(0);
  expect(result.current.items).toEqual([]);
});
