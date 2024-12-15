import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";

import { Grade } from "../../api/services/types";

import Card from "./Card";

test("render grade image", () => {
  render(
    <Card
      id="test"
      name="test"
      grade={Grade.TREE}
      currentCohort={1}
      cohorts={[1]}
    />,
  );

  expect(
    screen.getByRole("img", { name: `${Grade.TREE} image` }),
  ).toBeInTheDocument();
});

test("render github name", () => {
  const name = "user123";
  render(
    <Card
      id="test"
      name={name}
      grade={Grade.TREE}
      currentCohort={1}
      cohorts={[1]}
    />,
  );

  expect(screen.getByRole("region", { name })).toBeInTheDocument();
});

test("render cohort", () => {
  const currentCohort = 2;
  render(
    <Card
      id="test"
      name="user123"
      grade={Grade.TREE}
      currentCohort={currentCohort}
      cohorts={[currentCohort]}
    />,
  );

  expect(
    screen.getByRole("region", { name: `${currentCohort}기` }),
  ).toBeInTheDocument();
});

test("render progress link", () => {
  const id = "test";
  render(
    <Card
      id={id}
      name="user123"
      grade={Grade.TREE}
      currentCohort={1}
      cohorts={[1]}
    />,
  );

  const link = within(
    screen.getByRole("region", { name: `card-navigation-${id}` }),
  ).getByRole("link", { name: "풀이 현황" });

  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", `/progress?member=${id}`);
});

test("render certificate link", () => {
  const id = "test";
  render(
    <Card
      id={id}
      name="user123"
      grade={Grade.TREE}
      currentCohort={1}
      cohorts={[1]}
    />,
  );

  const link = within(
    screen.getByRole("region", { name: `card-navigation-${id}` }),
  ).getByRole("link", { name: "수료증" });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", `/certificate?member=${id}`);
});
