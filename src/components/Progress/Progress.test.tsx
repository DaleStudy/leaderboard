<<<<<<< HEAD
import { faker } from "@faker-js/faker";
=======
<<<<<<< HEAD
<<<<<<< HEAD
import { faker } from "@faker-js/faker";
=======
<<<<<<< HEAD
>>>>>>> 2647efc (feat : convert profileurl to pass as prop)
=======
>>>>>>> 18e4279 (feat : complete progress component)
>>>>>>> da91128 (feat : complete progress component)
import { expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Progress from "./Progress";
import { mock } from "vitest-mock-extended";
import useMembers from "../../hooks/useMembers";
import { test, vi } from "vitest";
<<<<<<< HEAD
import { type Member, Grade } from "../../api/services/types";
=======
<<<<<<< HEAD
<<<<<<< HEAD
import { type Member, Grade } from "../../api/services/types";
=======
<<<<<<< HEAD
import { Member } from "../../api/services/types";
=======
>>>>>>> 4743ef2 (feat : convert profileurl to pass as prop)
>>>>>>> 2647efc (feat : convert profileurl to pass as prop)
=======
import { Member } from "../../api/services/types";
>>>>>>> 18e4279 (feat : complete progress component)
>>>>>>> da91128 (feat : complete progress component)

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
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> 4743ef2 (feat : convert profileurl to pass as prop)
>>>>>>> da91128 (feat : complete progress component)
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
<<<<<<< HEAD
}
=======
}
=======
});
>>>>>>> 18e4279 (feat : complete progress component)
>>>>>>> da91128 (feat : complete progress component)
