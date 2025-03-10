import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { mock } from "vitest-mock-extended";

import useMembers from "../../hooks/useMembers";
import Progress from "./Progress";
import { createMockMember, mockUseMembers } from "../../test-utils/useMembers";

vi.mock("../../hooks/useMembers");

test("render the site header", () => {
  vi.mocked(useMembers).mockReturnValue(
    mock({
      ...mockUseMembers,
      members: [createMockMember({ id: "sam" })],
    }),
  );

  vi.stubGlobal("location", {
    href: `http://example.com?member=sam`,
    search: `?member=sam`,
  });

  render(<Progress />);

  const header = screen.getByRole("banner");
  expect(header).toBeInTheDocument();
});

test("display error message if member is not found", () => {
  vi.mocked(useMembers).mockReturnValue(mock(mockUseMembers));

  render(<Progress />);

  const header = screen.getByRole("heading", { level: 1 });
  expect(header).toHaveTextContent("Page Not Found");
});

test("display member is not found when query parameter is not passed", () => {
  vi.mocked(useMembers).mockReturnValue(mock(mockUseMembers));
  vi.stubGlobal("location", {
    href: "http://example.com",
  });
  render(<Progress />);

  const heading = screen.getByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent("Page Not Found");
});

test("render page when query parameter is passed", async () => {
  const mockedMember = createMockMember();
  const mockedQueryParam = "evan";

  mockedMember.id = mockedQueryParam;
  mockedMember.name = "soundmin";
  mockedMember.solvedProblems = [
    { id: 31, title: "Problem 1", difficulty: "Easy" },
    { id: 52, title: "Problem 2", difficulty: "Med" },
    { id: 30, title: "Problem 3", difficulty: "Hard" },
  ];

  vi.mocked(useMembers).mockReturnValue(
    mock({ ...mockUseMembers, members: [mockedMember] }),
  );

  vi.stubGlobal("location", {
    href: `http://example.com?member=${mockedQueryParam}`,
    search: `?member=${mockedQueryParam}`,
  });

  render(<Progress />);

  // Assert that the error message is not shown
  const errorMessage = screen.queryByText("Member not found!");
  expect(errorMessage).not.toBeInTheDocument();

  // Wait for the member's name to appear
  const userNameElement = await screen.findByText(mockedMember.name);
  expect(userNameElement).toBeInTheDocument();
});

describe("Server Error", () => {
  test("render error UI when data fetching has error", () => {
    vi.mocked(useMembers).mockReturnValue(
      mock({ ...mockUseMembers, error: new Error("An error occurred") }),
    );

    render(<Progress />);

    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(
      screen.getByText(
        "오류가 발생했습니다. 문제가 지속된다면 아래 Github Issue를 방문하여 문제를 보고하거나 진행 상황을 확인해 주시면 감사하겠습니다.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("문제 보고하기")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "문제 보고하기" })).toHaveAttribute(
      "href",
      "https://github.com/DaleStudy/leaderboard/issues",
    );
  });

  test("renders empty UI in Sidebar when data fetching has error", () => {
    vi.mocked(useMembers).mockReturnValue(
      mock({ ...mockUseMembers, error: new Error("An error occurred") }),
    );

    render(<Progress />);

    // Check if the "풀이 보기" text is not present in the sidebar
    expect(screen.queryByText("풀이 보기")).not.toBeInTheDocument();

    // Check if the "리더보드로 돌아가기" link is not present in the sidebar
    expect(
      screen.queryByRole("link", { name: /리더보드로 돌아가기/i }),
    ).not.toBeInTheDocument();
  });
});
