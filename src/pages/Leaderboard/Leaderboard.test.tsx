import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { mock } from "vitest-mock-extended";

import { createMockMember, mockUseMembers } from "../../test-utils/useMembers";
import useMembers from "../../hooks/useMembers";

import Leaderboard from "./Leaderboard";
import userEvent from "@testing-library/user-event";
import usePagination from "../../hooks/usePagination";

vi.mock("../../hooks/useMembers");
vi.mock("../../hooks/usePagination");

test("render the loading while fetching members", () => {
  vi.mocked(useMembers).mockReturnValue(
    mock({ ...mockUseMembers, isLoading: true }),
  );
  vi.mocked(usePagination).mockReturnValue(mock(dummyPagination));

  render(<Leaderboard />);

  expect(screen.getByRole("status")).toHaveAccessibleName(/스피너/i);
});

describe("error occurred while fetching members", () => {
  test("render the error message", () => {
    vi.mocked(useMembers).mockReturnValue(
      mock({ ...mockUseMembers, error: new Error() }),
    );
    vi.mocked(usePagination).mockReturnValue(
      mock({ ...dummyPagination, items: mockUseMembers.members }),
    );

    render(<Leaderboard />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Error",
    );
    expect(
      screen.getByText(
        "오류가 발생했습니다. 문제가 지속된다면 아래 Github Issue를 방문하여 문제를 보고하거나 진행 상황을 확인해 주시면 감사하겠습니다.",
      ),
    ).toBeInTheDocument();
  });

  test("render the report issue link", () => {
    vi.mocked(useMembers).mockReturnValue(
      mock({ ...mockUseMembers, error: new Error() }),
    );
    vi.mocked(usePagination).mockReturnValue(
      mock({ ...dummyPagination, items: mockUseMembers.members }),
    );

    render(<Leaderboard />);

    const reportLink = screen.getByRole("link", { name: "문제 보고하기" });
    expect(reportLink).toBeInTheDocument();
    expect(reportLink).toHaveAttribute(
      "href",
      "https://github.com/DaleStudy/leaderboard/issues",
    );
  });
});

test("render the page title", () => {
  vi.mocked(useMembers).mockReturnValue(mock(mockUseMembers));
  vi.mocked(usePagination).mockReturnValue(
    mock({ ...dummyPagination, items: mockUseMembers.members }),
  );

  render(<Leaderboard />);
  const heading = screen.getByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent("리더보드");
});

test("render the member cards", () => {
  const members = [createMockMember(), createMockMember(), createMockMember()];

  vi.mocked(useMembers).mockReturnValue(mock({ ...mockUseMembers, members }));
  vi.mocked(usePagination).mockReturnValue(
    mock({ ...dummyPagination, items: members }),
  );

  render(<Leaderboard />);

  const memberCards = screen.getAllByRole("article");

  expect(memberCards).toHaveLength(members.length);
});

test("render the search bar", () => {
  const members = [createMockMember()];
  vi.mocked(useMembers).mockReturnValue(
    mock({ ...mockUseMembers, members: members }),
  );
  vi.mocked(usePagination).mockReturnValue(
    mock({ ...dummyPagination, items: members }),
  );

  render(<Leaderboard />);

  expect(screen.getByLabelText("검색 창"));
});

test("render the grade creteria", () => {
  const members = [createMockMember()];
  vi.mocked(useMembers).mockReturnValue(
    mock({ ...mockUseMembers, members: members }),
  );
  vi.mocked(usePagination).mockReturnValue(
    mock({ ...dummyPagination, items: members }),
  );

  render(<Leaderboard />);

  expect(screen.getByText(/등급 기준/)).toBeInTheDocument();
});

test("calls goPrevious when clicking the previous button", async () => {
  const members = [createMockMember(), createMockMember(), createMockMember()];
  vi.mocked(useMembers).mockReturnValue(
    mock({ ...mockUseMembers, members: members }),
  );
  const goPrevious = vi.fn();
  vi.mocked(usePagination).mockReturnValue(
    mock({
      current: 2,
      goPrevious,
      goNext: vi.fn(),
      totalPages: 1,
      items: members,
    }),
  );

  render(<Leaderboard />);

  const prevButton = screen.getByRole("button", { name: "이전 페이지로 이동" });
  expect(prevButton).toBeInTheDocument();

  await userEvent.click(prevButton);
  expect(goPrevious).toHaveBeenCalled();
});

test("calls goNext when clicking the next button", async () => {
  const members = [createMockMember(), createMockMember(), createMockMember()];
  vi.mocked(useMembers).mockReturnValue(
    mock({ ...mockUseMembers, members: members }),
  );
  const goNext = vi.fn();
  vi.mocked(usePagination).mockReturnValue(
    mock({
      current: 2,
      goNext,
      goPrevious: vi.fn(),
      totalPages: 1,
      items: members,
    }),
  );
  render(<Leaderboard />);

  const nextButton = screen.getByRole("button", { name: "다음 페이지로 이동" });
  expect(nextButton).toBeInTheDocument();

  await userEvent.click(nextButton);
  expect(goNext).toHaveBeenCalled();
});

const dummyPagination = {
  current: 1,
  goNext: vi.fn(),
  goPrevious: vi.fn(),
  totalPages: 1,
  items: mockUseMembers.members,
};
