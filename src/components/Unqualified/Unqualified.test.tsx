import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Unqualified from "./Unqualified";

test("renders the heading", () => {
  render(<Unqualified />);

  expect(
    screen.getByRole("heading", { name: /you can do it/i }),
  ).toBeInTheDocument();
});

test("renders the description", () => {
  render(<Unqualified />);

  expect(
    screen.getByText(/조금씩 자라나고 있어요, 곧 멋진 나무가 될 거예요!/),
  ).toBeInTheDocument();
});

test("renders the link to the leaderboard page with correct href", () => {
  render(<Unqualified />);

  const leaderboardLink = screen.getByRole("link", {
    name: "리더보드로 돌아가기",
  });
  expect(leaderboardLink).toHaveAttribute("href", "/");
});
