import { faker } from "@faker-js/faker";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { mock } from "vitest-mock-extended";

import { type Member, Grade } from "../../api/services/types";
import useMembers from "../../hooks/useMembers";
import Progress from "./Progress";

vi.mock("../../hooks/useMembers");

test("render the site header", () => {
  vi.mocked(useMembers).mockReturnValue(
    mock({
      isLoading: false,
      error: null,
      members: [mockMember({ id: "sam" })],
      totalCohorts: 3, // Add missing property
      filter: { name: "", cohort: null }, // Add missing property
      setFilter: vi.fn(), // Add mock function
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
  vi.mocked(useMembers).mockReturnValue(
    mock({
      isLoading: false,
      error: null,
      members: [],
      totalCohorts: 3,
      filter: { name: "", cohort: null },
      setFilter: vi.fn(),
    }),
  );

  render(<Progress />);

  const errorMessage = screen.getByText("Member not found!");
  expect(errorMessage).toBeInTheDocument();
});

test("display member is not found when query parameter is not passed", () => {
  vi.mocked(useMembers).mockReturnValue(
    mock({
      isLoading: false,
      error: null,
      members: [],
      totalCohorts: 3,
      filter: { name: "", cohort: null },
      setFilter: vi.fn(),
    }),
  );
  vi.stubGlobal("location", {
    href: "http://example.com",
  });
  render(<Progress />);

  const errorMessage = screen.getByText("Member not found!");
  expect(errorMessage).toBeInTheDocument();
});

test("render page when query parameter is passed", async () => {
  const mockedMember = mockMember();
  const mockedQueryParam = "evan";

  mockedMember.id = mockedQueryParam;
  mockedMember.name = "soundmin";
  mockedMember.solvedProblems = [
    { id: 31, title: "Problem 1", difficulty: "Easy" },
    { id: 52, title: "Problem 2", difficulty: "Med" },
    { id: 30, title: "Problem 3", difficulty: "Hard" },
  ];

  vi.mocked(useMembers).mockReturnValue(
    mock({
      isLoading: false,
      error: null,
      members: [mockedMember],
      totalCohorts: 3,
      filter: { name: "", cohort: null },
      setFilter: vi.fn(),
    }),
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
      mock({
        isLoading: false,
        error: new Error("An error occurred"),
        members: [],
        totalCohorts: 3,
        filter: { name: "", cohort: null },
        setFilter: vi.fn(),
      }),
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

  test("render empty UI in Sidebar when data fetching has error", () => {
    vi.mocked(useMembers).mockReturnValue(
      mock({
        isLoading: false,
        error: new Error("An error occurred"),
        members: [],
        totalCohorts: 3,
        filter: { name: "", cohort: null },
        setFilter: vi.fn(),
      }),
    );

    render(<Progress />);

    const sidebar = within(screen.getByRole("complementary"));
    expect(sidebar.queryByText("풀이 보기")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /리더보드로 돌아가기/i }),
    ).not.toBeInTheDocument();
  });
});

function mockMember({ id = faker.internet.userName() }: { id?: string } = {}) {
  return mock<Member>({
    id,
    name: id,
    cohort: faker.number.int({ min: 1, max: 9 }),
    grade: faker.helpers.arrayElement(Object.values(Grade)),
    profileUrl: faker.internet.url(),
    solvedProblems: [],
  });
}
