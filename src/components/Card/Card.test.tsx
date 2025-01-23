import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Card from "./Card";

test("render grade image", () => {
  render(<Card id="test" name="test" grade={"TREE"} cohorts={[1]} />);

  expect(
    screen.getByRole("img", { name: `${"TREE"} image` }),
  ).toBeInTheDocument();
});

test("renders GitHub name", () => {
  const name = "user123";
  render(<Card id="test" name={name} grade="TREE" cohorts={[1]} />);

  const displayedName = screen.getByText(name);

  expect(displayedName).toBeInTheDocument();
});

test("render cohort", () => {
  const cohorts = [2];
  render(<Card id="test" name="user123" grade={"TREE"} cohorts={cohorts} />);
  expect(screen.getByText(`${cohorts.at(-1)}기`)).toBeInTheDocument();
});

test("render progress link", () => {
  const id = "test";
  render(<Card id={id} name="user123" grade={"TREE"} cohorts={[1]} />);

  const link = screen.getByRole("link", { name: "풀이 현황" });

  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", `/progress?member=${id}`);
});

test("render certificate link", () => {
  const id = "test";
  render(<Card id={id} name="user123" grade={"TREE"} cohorts={[1]} />);

  const link = screen.getByRole("link", { name: "수료증" });

  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", `/certificate?member=${id}`);
});
