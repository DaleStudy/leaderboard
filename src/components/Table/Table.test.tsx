import { render, screen, within } from "@testing-library/react";
import { test, expect } from "vitest";
import { Table } from "./Table";

const problems = [
  {
    id: 128,
    title: "Longest Consecutive Sequence",
    difficulty: "Med.",
  },
  { id: 1, title: "Two Sum", difficulty: "Easy" },
  { id: 257, title: "Binary Tree Paths", difficulty: "Easy" },
  { id: 133, title: "Clone Graph", difficulty: "Med." },
];

const solvedProblems = [
  {
    id: 128,
    title: "Longest Consecutive Sequence",
    difficulty: "Med.",
  },
  { id: 257, title: "Binary Tree Paths", difficulty: "Easy" },
  { id: 133, title: "Clone Graph", difficulty: "Med." },
];

test("renders table headers", () => {
  render(<Table problems={problems} solvedProblems={solvedProblems} />);
  expect(
    screen.getByRole("columnheader", { name: "문제명" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("columnheader", { name: "난이도" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("columnheader", { name: "문제 완료 상태" }),
  ).toBeInTheDocument();
});

test("renders number of problem rows", () => {
  render(<Table problems={problems} solvedProblems={solvedProblems} />);
  const rows = screen.getAllByRole("row");
  expect(rows).toHaveLength(problems.length + 1);
});

test("renders icon for completed/incomplete problems", () => {
  render(<Table problems={problems} solvedProblems={solvedProblems} />);

  const rows = screen.getAllByRole("row").slice(1);

  rows.forEach((row, index) => {
    const problem = problems[index];
    const isCompleted = solvedProblems.some((p) => p.id === problem.id);
    const iconLabel = isCompleted ? "완료 문제" : "미완료 문제";

    const icon = within(row).getByLabelText(iconLabel);
    expect(icon).toBeInTheDocument();
  });
});
