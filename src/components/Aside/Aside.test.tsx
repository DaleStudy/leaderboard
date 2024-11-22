import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Aside from "./Aside";

test("renders the Aside component", () => {
  render(
    <Aside
      githubUsername="testuser"
      easyTasks="10"
      mediumTasks="5"
      hardTasks="2"
      solvedTasks={17}
      totalTasks={30}
    />,
  );

  const aside = screen.getByRole("complementary");
  expect(aside).toBeInTheDocument();
});

test("displays the number of solved tasks", () => {
  render(
    <Aside
      githubUsername="testuser"
      easyTasks="10"
      mediumTasks="5"
      hardTasks="2"
      solvedTasks={17}
      totalTasks={30}
    />,
  );

  const solvedTasksText = screen.getByText(/17 문제/i);
  expect(solvedTasksText).toBeInTheDocument();
});

test("displays the username", () => {
  render(
    <Aside
      githubUsername="testuser"
      easyTasks="10"
      mediumTasks="5"
      hardTasks="2"
      solvedTasks={17}
      totalTasks={30}
    />,
  );

  const username = screen.getByText(/testuser/i);
  expect(username).toBeInTheDocument();
});

test("renders the button link with the text", () => {
  render(
    <Aside
      githubUsername="testuser"
      easyTasks="10"
      mediumTasks="5"
      hardTasks="2"
      solvedTasks={17}
      totalTasks={30}
    />,
  );

  const buttonLink = screen.getByRole("link", {
    name: /리더보드로 돌아가기/i,
  });
  expect(buttonLink).toBeInTheDocument();
});
