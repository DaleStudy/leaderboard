import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import NotFound from "./NotFound";

test("render error title", () => {
  render(<NotFound />);

  const heading = screen.getByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent("Page Not Found");
});

test("render error description", () => {
  render(<NotFound />);

  const description = screen.getByRole("paragraph");
  expect(description).toHaveTextContent(
    "요청하신 페이지를 찾을 수 없습니다. 아래 버튼을 눌러 리더보드로 돌아가 주세요.",
  );
});

test("render reader board link ", () => {
  render(<NotFound />);

  const leaderboardLink = screen.getByRole("link", {
    name: "리더보드로 돌아가기",
  });
  expect(leaderboardLink).toHaveAttribute("href", "/");
});
