import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, expect, test, vi } from "vitest";
import type { Filter } from "../../hooks/useMembers";
import SearchBar from "./SearchBar";

const totalCohorts = 5;
let onSearchMock: ReturnType<typeof vi.fn>;
let filter: Filter;

beforeEach(() => {
  onSearchMock = vi.fn();
  filter = { name: "", cohort: null };
});

test("renders name input field", () => {
  render(
    <SearchBar
      filter={filter}
      onSearch={onSearchMock}
      totalCohorts={totalCohorts}
    />,
  );

  expect(screen.getByPlaceholderText("검색")).toBeInTheDocument();
  expect(screen.getByLabelText("이름 검색")).toBeInTheDocument();
});

test("renders select field and options by totalCohorts", () => {
  render(
    <SearchBar
      filter={filter}
      onSearch={onSearchMock}
      totalCohorts={totalCohorts}
    />,
  );

  expect(screen.getByText("전체 기수")).toBeInTheDocument();
  expect(screen.getByLabelText("기수 선택")).toBeInTheDocument();

  for (let i = 1; i <= totalCohorts; i++) {
    expect(screen.getByText(`${i}기`)).toBeInTheDocument();
  }
});

test("calls onSearch after 0.3 seconds when name is entered", async () => {
  render(
    <SearchBar
      filter={filter}
      onSearch={onSearchMock}
      totalCohorts={totalCohorts}
    />,
  );

  const input = screen.getByPlaceholderText("검색") as HTMLInputElement;

  // Simulate entering 'John'
  fireEvent.change(input, { target: { value: "John" } });

  // Should not call onSearch immediately
  expect(onSearchMock).not.toHaveBeenCalled();

  // Wait 300ms and check if onSearch was called
  await waitFor(
    () => {
      expect(onSearchMock).toHaveBeenCalledWith("John", null);
    },
    { timeout: 300 },
  );
});

test("debounces onSearch calls during name input", async () => {
  render(
    <SearchBar
      filter={filter}
      onSearch={onSearchMock}
      totalCohorts={totalCohorts}
    />,
  );

  const input = screen.getByPlaceholderText("검색") as HTMLInputElement;

  // Simulate rapid input
  fireEvent.change(input, { target: { value: "J" } });
  fireEvent.change(input, { target: { value: "Jo" } });
  fireEvent.change(input, { target: { value: "Joh" } });
  fireEvent.change(input, { target: { value: "John" } });

  // Wait 200ms and check if onSearch was called only once
  await waitFor(
    () => {
      expect(onSearchMock).toHaveBeenCalledTimes(1);
      expect(onSearchMock).toHaveBeenCalledWith("John", null);
    },
    { timeout: 300 },
  );
});

test("calls onSearch immediately when cohort is selected", () => {
  render(
    <SearchBar
      filter={filter}
      onSearch={onSearchMock}
      totalCohorts={totalCohorts}
    />,
  );

  const select = screen.getByRole("combobox") as HTMLSelectElement;

  // Select cohort 2
  fireEvent.change(select, { target: { value: "2" } });

  expect(onSearchMock).toHaveBeenCalledWith("", 2);
});

test("calls onSearch when only cohort is selected without name", () => {
  render(
    <SearchBar
      filter={filter}
      onSearch={onSearchMock}
      totalCohorts={totalCohorts}
    />,
  );

  const select = screen.getByRole("combobox") as HTMLSelectElement;

  // Select cohort 3
  fireEvent.change(select, { target: { value: "3" } });

  expect(onSearchMock).toHaveBeenCalledWith("", 3);
});

test("calls onSearch when name is empty and cohort is selected", () => {
  render(
    <SearchBar
      filter={filter}
      onSearch={onSearchMock}
      totalCohorts={totalCohorts}
    />,
  );

  const input = screen.getByPlaceholderText("검색") as HTMLInputElement;
  const select = screen.getByRole("combobox") as HTMLSelectElement;

  // Select cohort 1
  fireEvent.change(select, { target: { value: "1" } });

  // Change name to empty string
  fireEvent.change(input, { target: { value: "" } });

  // Wait for trigger
  expect(onSearchMock).toHaveBeenCalledWith("", 1);
});
