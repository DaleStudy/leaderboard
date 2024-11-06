import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";

import Card from "./Card";

test("render grade image", () => {
  const grade = "BIG_TREE";
  render(<Card id="test" name="test" grade={grade} cohort={1} />);

  expect(
    screen.getByRole("img", { name: `${grade} image` }),
  ).toBeInTheDocument();
});

test("render github name", () => {
  const name = "user123";
  render(<Card id="test" name={name} grade="BIG_TREE" cohort={1} />);

  expect(screen.getByRole("region", { name })).toBeInTheDocument();
});

test("render cohort", () => {
  const cohort = 2;
  render(<Card id="test" name="user123" grade="BIG_TREE" cohort={cohort} />);

  expect(
    screen.getByRole("region", { name: `${cohort}기` }),
  ).toBeInTheDocument();
});

test("render progress button", () => {
  const id = "test";
  render(<Card id={id} name="user123" grade="BIG_TREE" cohort={1} />);

  const link = within(
    screen.getByRole("navigation", { name: `card-navigation-${id}` }),
  ).getByRole("link", { name: "풀이 현황" });

  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", `/progress?member=${id}`);
});

test("render certificate button", () => {
  const id = "test";
  render(<Card id={id} name="user123" grade="BIG_TREE" cohort={1} />);

  const link = within(
    screen.getByRole("navigation", { name: `card-navigation-${id}` }),
  ).getByRole("link", { name: "수료증" });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", `/certificate?member=${id}`);
});
