import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import Error404 from "./Error404";

test("render error title", () => {
  render(<Error404 />);

  const heading = screen.getByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent("Page Not Found");
});

test("render error description", () => {
  render(<Error404 />);

  const description = screen.getByRole("paragraph");
  expect(description).toHaveTextContent(
    "요청하신 페이지를 찾을 수 없습니다. 아래 버튼을 눌러 리더보드로 돌아가 주세요.",
  );
});

test("render reader board link ", () => {
  render(<Error404 />);

  const leaderboardLink = screen.getByRole("link", {
    name: "리더보드로 돌아가기",
  });
  expect(leaderboardLink).toHaveAttribute("href", "/");
});
