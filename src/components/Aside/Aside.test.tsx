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

test("displays the correct number of solved tasks", () => {
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

test("displays the username correctly", () => {
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

test("renders the return button with the correct text", () => {
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

  const returnButton = screen.getByRole("button", {
    name: /리더보드로 돌아가기/i,
  });
  expect(returnButton).toBeInTheDocument();
});
