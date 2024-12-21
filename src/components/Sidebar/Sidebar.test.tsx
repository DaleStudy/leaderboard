import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar.tsx";
import { Grade } from "../../api/services/types";

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
      currentCohort={3}
      cohorts={[1, 2, 3]}
      grade={Grade.TREE}
    />,
  );

  // Check if the sidebar exists
  const sidebar = screen.getByRole("complementary");
  expect(sidebar).toBeInTheDocument();

  // Check if the username is displayed
  const username = screen.getByText(/testuser/i);
  expect(username).toBeInTheDocument();

  // Check if the button link exists
  const buttonLink = screen.getByRole("link", {
    name: /리더보드로 돌아가기/i,
  });
  expect(buttonLink).toBeInTheDocument();
});

test("renders empty Sidebar when error", () => {
  render(<Sidebar isError />);

  const sidebar = screen.getByRole("complementary");
  expect(sidebar).toBeInTheDocument();

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
