import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar.tsx";

test("renders Sidebar with all elements", () => {
  render(
    <Sidebar
      githubUsername="testuser"
      easyProgress="10/15"
      mediumProgress="5/10"
      hardProgress="2/5"
      solvedProblems={17}
      totalProblems={30}
      profileUrl="example.png"
      cohorts={[1, 2, 3]}
      grade={"TREE"}
    />,
  );

  // Check if the sidebar exists by unique text (e.g., username)
  const username = screen.getByText(/testuser/i);
  expect(username).toBeInTheDocument();

  // Check if the cohort info is displayed
  const cohortText = screen.getByText(/1, 2, 3/i);
  expect(cohortText).toBeInTheDocument();

  // Check if the button link exists
  const buttonLink = screen.getByRole("link", {
    name: /리더보드로 돌아가기/i,
  });
  expect(buttonLink).toBeInTheDocument();
});

test("renders empty Sidebar when error", () => {
  render(<Sidebar isError />);

  // Check that no links are rendered in the error state
  expect(
    screen.queryByRole("link", {
      name: /풀이 보기/i,
    }),
  ).not.toBeInTheDocument();

  expect(
    screen.queryByRole("link", {
      name: /리더보드로 돌아가기/i,
    }),
  ).not.toBeInTheDocument();
});
