import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterAll, expect, test, vi } from "vitest";
import { mock } from "vitest-mock-extended";

import { Member } from "../../api/services/types";
import useMembers from "../../hooks/useMembers";
import Certificate from "./Certificate";

vi.mock("../../hooks/useMembers");

afterAll(() => {
  vi.mocked(window.print).mockRestore();
});

test("render the loading message while fetching members", () => {
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

  render(<Certificate />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
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

  render(<Certificate />);

  expect(screen.getByText(/error/i)).toBeInTheDocument();
});

test("render page title", () => {
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

  render(<Certificate />);
  const heading = screen.getByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent("수료증");
});

test("render content id", () => {
  const members = [
    mock<Member>({
      id: "test1",
      name: "테스트1",
    }),
    mock<Member>({
      id: "test2",
      name: "테스트2",
    }),
  ];

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

  members.forEach(({ id, name }) => {
    location.href = new URL(`?member=${id}`, location.href).toString();
    render(<Certificate />);
    expect(screen.getByRole("heading", { level: 4, name }));
  });
});

test("render content solved problems, cohort", () => {
  const members = [
    mock<Member>({
      solvedProblems: Array(5).fill({}),
      cohort: 1,
      id: "test1",
      name: "테스트1",
    }),
    mock<Member>({
      solvedProblems: Array(10).fill({}),
      cohort: 2,
      id: "test2",
      name: "테스트2",
    }),
    mock<Member>({
      solvedProblems: Array(20).fill({}),
      cohort: 3,
      id: "test3",
      name: "테스트3",
    }),
    mock<Member>({
      solvedProblems: Array(75).fill({}),
      cohort: 4,
      id: "test4",
      name: "테스트4",
    }),
  ];

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
  const cohortSuffix = ["th", "st", "nd", "rd"];
  members.forEach(({ id, solvedProblems, cohort }) => {
    location.href = new URL(`?member=${id}`, location.href).toString();

    render(<Certificate />);

    screen.getByText(
      new RegExp(
        `${solvedProblems.length === 75 ? "all" : solvedProblems.length} problems`,
        "i",
      ),
    );
    screen.getByText(
      new RegExp(`${cohort}${cohortSuffix?.[cohort ?? 0] ?? "th"}`, "i"),
    );
  });
});

test("render print button", () => {
  vi.mocked(useMembers).mockReturnValue(
    mock({
      isLoading: false,
      error: null,
      members: [mock<Member>()],
      totalCohorts: 0,
      filter: { name: "", cohort: null },
      setFilter: vi.fn(),
    }),
  );

  render(<Certificate />);

  const printButton = screen.getByRole("button", { name: "출력" });
  expect(printButton).toBeInTheDocument();
});

test("calls window.print when the print button is clicked", async () => {
  vi.mocked(useMembers).mockReturnValue(
    mock({
      isLoading: false,
      error: null,
      members: [mock<Member>()],
      totalCohorts: 0,
      filter: { name: "", cohort: null },
      setFilter: vi.fn(),
    }),
  );
  vi.spyOn(window, "print").mockImplementation(() => {});

  render(<Certificate />);

  const printButton = screen.getByRole("button", { name: "출력" });
  const user = userEvent.setup();
  await user.click(printButton);
  expect(window.print).toHaveBeenCalledOnce();
});

test("render LinkedIn link", () => {
  const members = [mock<Member>({ id: "test1", name: "테스트1" })];
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
  location.href = new URL(`?member=${members[0].id}`, location.href).toString();

  render(<Certificate />);

  const linkedInLink = screen.getByRole("link", {
    name: "링크드인 공유",
  });

  expect(linkedInLink).toHaveAttribute(
    "href",
    `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${members[0].name}&organizationId=104834174&certUrl=${location.href}`,
  );
});
