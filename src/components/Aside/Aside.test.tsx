import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Aside from "./Aside";
import { Grade } from "../../api/services/common/types.ts";

test("renders the Aside component", () => {
  render(
    <Aside
      githubUsername="testuser"
      easyTasks="10/15"
      mediumTasks="5/10"
      hardTasks="2/5"
      solvedTasks={17}
      totalTasks={30}
      profile_url="https://example.com/profile.jpg"
      cohort={3}
      grade={Grade.SMALL_TREE}
    />,
  );

  const aside = screen.getByRole("complementary");
  expect(aside).toBeInTheDocument();
});

test("displays the username", () => {
  render(
    <Aside
      githubUsername="testuser"
      easyTasks="10/15"
      mediumTasks="5/10"
      hardTasks="2/5"
      solvedTasks={17}
      totalTasks={30}
      profile_url="https://example.com/profile.jpg"
      cohort={3}
      grade={Grade.SMALL_TREE}
    />,
  );

  const username = screen.getByText(/testuser/i);
  expect(username).toBeInTheDocument();
});

test("renders the button link with the text", () => {
  render(
    <Aside
      githubUsername="testuser"
      easyTasks="10/15"
      mediumTasks="5/10"
      hardTasks="2/5"
      solvedTasks={17}
      totalTasks={30}
      profile_url="https://example.com/profile.jpg"
      cohort={3}
      grade={Grade.SMALL_TREE}
    />,
  );

  const buttonLink = screen.getByRole("link", {
    name: /리더보드로 돌아가기/i,
  });
  expect(buttonLink).toBeInTheDocument();
});
