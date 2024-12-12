import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import ServerError from "./ServerError";

test("renders the error description", () => {
  render(<ServerError />);

  expect(screen.getByText("Error")).toBeInTheDocument();
  expect(
    screen.getByText(
      "오류가 발생했습니다. 문제가 지속된다면 아래 Github Issue를 방문하여 문제를 보고하거나 진행 상황을 확인해 주시면 감사하겠습니다.",
    ),
  ).toBeInTheDocument();
});

test("renders the button to go to the project github issue page", () => {
  render(<ServerError />);

  const reportLink = screen.getByRole("link", { name: "문제 보고하기" });
  expect(reportLink).toBeInTheDocument();
  expect(reportLink).toHaveAttribute(
    "href",
    "https://github.com/DaleStudy/leaderboard/issues",
  );
});
