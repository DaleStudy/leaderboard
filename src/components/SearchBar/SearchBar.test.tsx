import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  const input = screen.getByPlaceholderText("검색");

  // Simulate entering 'John'
  const user = userEvent.setup();
  user.type(input, "John");

  // Should not call onSearch immediately
  expect(onSearchMock).not.toHaveBeenCalled();

  // Wait 300ms and check if onSearch was called
  await waitFor(() => expect(onSearchMock).toHaveBeenCalledTimes(1));
  expect(onSearchMock).toHaveBeenCalledWith({
    name: "John",
    cohort: null,
  });
});

test("debounces onSearch calls during name input", async () => {
  render(
    <SearchBar
      filter={filter}
      onSearch={onSearchMock}
      totalCohorts={totalCohorts}
    />,
  );

  const input = screen.getByPlaceholderText("검색");

  // Simulate rapid input
  const user = userEvent.setup();
  await user.type(input, "J");
  await user.type(input, "o");
  await user.type(input, "h");
  await user.type(input, "n");

  // Wait 200ms and check if onSearch was called only once
  await waitFor(() => expect(onSearchMock).toHaveBeenCalledTimes(1));
  expect(onSearchMock).toHaveBeenCalledWith({
    name: "John",
    cohort: null,
  });
});

test("calls onSearch immediately when cohort is selected", async () => {
  render(
    <SearchBar
      filter={filter}
      onSearch={onSearchMock}
      totalCohorts={totalCohorts}
    />,
  );

  const select = screen.getByRole("combobox");

  // Select cohort 2
  const user = userEvent.setup();
  await user.selectOptions(select, "2");

  expect(onSearchMock).toHaveBeenCalledWith({
    name: "",
    cohort: 2,
  });
});

test("calls onSearch when only cohort is selected without name", async () => {
  render(
    <SearchBar
      filter={filter}
      onSearch={onSearchMock}
      totalCohorts={totalCohorts}
    />,
  );

  const select = screen.getByRole("combobox");

  // Select cohort 3
  const user = userEvent.setup();
  await user.selectOptions(select, "3");

  expect(onSearchMock).toHaveBeenCalledWith({
    name: "",
    cohort: 3,
  });
});

test("calls onSearch when name is entered and cohort is selected", async () => {
  render(
    <SearchBar
      filter={filter}
      onSearch={onSearchMock}
      totalCohorts={totalCohorts}
    />,
  );

  const input = screen.getByPlaceholderText("검색");
  const select = screen.getByRole("combobox");

  const user = userEvent.setup();

  // Select cohort 1
  await user.selectOptions(select, "1");

  // Change name to empty string
  await user.type(input, "John");

  // Wait for trigger
  expect(onSearchMock).toHaveBeenCalledWith({
    name: "",
    cohort: 1,
  });
});
