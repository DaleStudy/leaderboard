import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
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

  expect(screen.getByRole("status")).toHaveAccessibleName(/spinner/i);
});

test("render the error message while fetching members", () => {
  vi.mocked(useMembers).mockReturnValue(
    mock({
      isLoading: false,
      error: new Error(),
      members: [],
      totalCohorts: 0,
      filter: { name: "", cohort: null },
      setFilter: vi.fn(),
    }),
  );

  render(<Leaderboard />);

  expect(screen.getByText(/error/i)).toBeInTheDocument();
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

  expect(screen.getByLabelText("Search Bar"));
});

function mockMember() {
  const userName = faker.internet.userName();
  const cohort = faker.number.int({ min: 1, max: 9 });
  return mock<Member>({
    id: userName,
    name: userName,
    cohort,
    cohorts: [cohort],
    grade: faker.helpers.arrayElement(Object.values(Grade)),
  });
}
