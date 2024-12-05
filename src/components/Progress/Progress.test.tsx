import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { mock } from "vitest-mock-extended";
import { type Member, Grade } from "../../api/services/types";
import useMembers from "../../hooks/useMembers";
import Progress from "./Progress";

vi.mock("../../hooks/useMembers");

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
    { title: "Problem 1", difficulty: "easy" },
    { title: "Problem 2", difficulty: "medium" },
    { title: "Problem 3", difficulty: "easy" },
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
