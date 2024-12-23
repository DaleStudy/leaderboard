import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { mock } from "vitest-mock-extended";

import { type Member, Grade } from "../../api/services/types";
import useMembers from "../../hooks/useMembers";
import Leaderboard from "./Leaderboard";

vi.mock("../../hooks/useMembers");

test("render the loading while fetching members", () => {
  vi.mocked(useMembers).mockReturnValue(
    mock({
      isLoading: true,
      error: null,
      members: [],
      totalCohorts: 0,
      filter: { name: "", cohort: null },
      setFilter: vi.fn(),
    }),
  );

  render(<Leaderboard />);

  expect(screen.getByRole("status")).toHaveAccessibleName(/스피너/i);
});

describe("error occurred while fetching members", () => {
  test("render the error message", () => {
    vi.mocked(useMembers).mockReturnValue(
      mock({
        error: new Error(),

        isLoading: false,
        members: [],
        totalCohorts: 0,
        filter: { name: "", cohort: null },
        setFilter: vi.fn(),
      }),
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
      mock({
        error: new Error(),

        isLoading: false,
        members: [],
        totalCohorts: 0,
        filter: { name: "", cohort: null },
        setFilter: vi.fn(),
      }),
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
  vi.mocked(useMembers).mockReturnValue(
    mock({
      isLoading: false,
      error: null,
      members: [],
      totalCohorts: 0,
      filter: { name: "", cohort: null },
      setFilter: vi.fn(),
    }),
  );

  render(<Leaderboard />);
  const heading = screen.getByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent("리더보드");
});

test("render the member cards", () => {
  const members = [mockMember(), mockMember(), mockMember()];

  vi.mocked(useMembers).mockReturnValue(
    mock({
      isLoading: false,
      error: null,
      members,
      totalCohorts: 0,
      filter: { name: "", cohort: null },
      setFilter: vi.fn(),
    }),
  );

  render(<Leaderboard />);

  const memberCards = screen.getAllByRole("article");

  expect(memberCards).toHaveLength(members.length);
});

test("render the search bar", () => {
  vi.mocked(useMembers).mockReturnValue(
    mock({
      isLoading: false,
      error: null,
      members: [mockMember()],
      totalCohorts: 0,
      filter: { name: "", cohort: null },
      setFilter: vi.fn(),
    }),
  );

  render(<Leaderboard />);

  expect(screen.getByLabelText("검색 창"));
});

function mockMember() {
  const userName = faker.internet.username();
  const currentCohort = faker.number.int({ min: 1, max: 9 });
  return mock<Member>({
    id: userName,
    name: userName,
    currentCohort,
    cohorts: [currentCohort],
    grade: faker.helpers.arrayElement(Object.values(Grade)),
  });
}
