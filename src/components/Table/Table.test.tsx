import { render, screen, within } from "@testing-library/react";
import { test, expect } from "vitest";
import Table from "./Table";

const problems = [
  {
    id: 128,
    title: "Longest Consecutive Sequence",
    difficulty: "Med.",
    completed: true,
  },
  { id: 1, title: "Two Sum", difficulty: "Easy", completed: true },
  { id: 257, title: "Binary Tree Paths", difficulty: "Easy", completed: false },
  { id: 133, title: "Clone Graph", difficulty: "Med.", completed: true },
];

test("renders table headers", () => {
  render(<Table problems={problems} />);
  expect(
    screen.getByRole("columnheader", { name: "Problem Title" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("columnheader", { name: "Problem Difficulty" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("columnheader", { name: "Problem Completion Status" }),
  ).toBeInTheDocument();
});

test("renders number of problem rows", () => {
  render(<Table problems={problems} />);
  const rows = screen.getAllByRole("row");
  expect(rows).toHaveLength(problems.length + 1); // +1 for the header row
});

test("renders icon for completed/incomplete problems", () => {
  render(<Table problems={problems} />);
  const rows = screen.getAllByRole("row").slice(1); // Exclude header row

  rows.forEach((row, index) => {
    const { completed } = problems[index];
    const iconLabel = completed ? "Completed problem" : "Incomplete problem";
    expect(within(row).getByLabelText(iconLabel)).toBeInTheDocument();
  });
});

test("renders icons for completed and incomplete problems", () => {
  render(<Table problems={problems} />);

  const completedIcons = screen.getAllByLabelText("Completed");
  const incompleteIcons = screen.getAllByLabelText("Incomplete");

  expect(completedIcons).toHaveLength(3);
  expect(incompleteIcons).toHaveLength(1);
});
