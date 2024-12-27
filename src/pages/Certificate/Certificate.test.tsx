import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterAll, expect, test, vi } from "vitest";
import { mock } from "vitest-mock-extended";

import { Member } from "../../api/services/types";
import useMembers from "../../hooks/useMembers";
import Certificate from "./Certificate";
import { gradeEmojiMap } from "./constants";

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

  expect(screen.getByRole("status")).toHaveAccessibleName("스피너");
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

test("display error message if member is not found", () => {
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
  expect(heading).toHaveTextContent("Page Not Found");
});

test("render page title", () => {
  vi.mocked(useMembers).mockReturnValue(
    mock({
      isLoading: false,
      error: null,
      members: [mock<Member>({ id: "test1", name: "테스트1" })],
      totalCohorts: 0,
      filter: { name: "", cohort: null },
      setFilter: vi.fn(),
    }),
  );

  location.href = new URL(`?member=test1`, location.href).toString();
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
      currentCohort: 1,
      id: "test1",
      name: "테스트1",
    }),
    mock<Member>({
      solvedProblems: Array(10).fill({}),
      currentCohort: 2,
      id: "test2",
      name: "테스트2",
    }),
    mock<Member>({
      solvedProblems: Array(20).fill({}),
      currentCohort: 3,
      id: "test3",
      name: "테스트3",
    }),
    mock<Member>({
      solvedProblems: Array(75).fill({}),
      currentCohort: 4,
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
  members.forEach(({ id, solvedProblems, currentCohort }) => {
    location.href = new URL(`?member=${id}`, location.href).toString();
    render(<Certificate />);

    screen.getByText(
      new RegExp(
        `${solvedProblems.length === 75 ? "all" : solvedProblems.length} problems`,
        "i",
      ),
    );
    screen.getByText(
      new RegExp(
        `${currentCohort}${cohortSuffix?.[currentCohort ?? 0] ?? "th"}`,
        "i",
      ),
    );
  });
});

test("render learderboard link", () => {
  vi.mocked(useMembers).mockReturnValue(
    mock({
      isLoading: false,
      error: null,
      members: [mock<Member>({ id: "test1", name: "테스트1" })],
      totalCohorts: 0,
      filter: { name: "", cohort: null },
      setFilter: vi.fn(),
    }),
  );

  location.href = new URL(`?member=test1`, location.href).toString();
  render(<Certificate />);

  const leaderboardLink = screen.getByRole("link", {
    name: "리더보드로 돌아가기",
  });
  expect(leaderboardLink).toHaveAttribute("href", `/`);
});

test("render print button", () => {
  vi.mocked(useMembers).mockReturnValue(
    mock({
      isLoading: false,
      error: null,
      members: [mock<Member>({ id: "test1", name: "테스트1" })],
      totalCohorts: 0,
      filter: { name: "", cohort: null },
      setFilter: vi.fn(),
    }),
  );

  location.href = new URL(`?member=test1`, location.href).toString();
  render(<Certificate />);

  const printButton = screen.getByRole("button", { name: "출력" });
  expect(printButton).toBeInTheDocument();
});

test("calls window.print when the print button is clicked", async () => {
  vi.mocked(useMembers).mockReturnValue(
    mock({
      isLoading: false,
      error: null,
      members: [mock<Member>({ id: "test1", name: "테스트1" })],
      totalCohorts: 0,
      filter: { name: "", cohort: null },
      setFilter: vi.fn(),
    }),
  );

  vi.spyOn(window, "print").mockImplementation(() => {});
  location.href = new URL(`?member=test1`, location.href).toString();
  render(<Certificate />);

  const printButton = screen.getByRole("button", { name: "출력" });
  const user = userEvent.setup();
  await user.click(printButton);
  expect(window.print).toHaveBeenCalledOnce();
});

test("render LinkedIn link", () => {
  vi.mocked(useMembers).mockReturnValue(
    mock({
      isLoading: false,
      error: null,
      members: [mock<Member>({ id: "test1", name: "테스트1", grade: "SEED" })],
      totalCohorts: 0,
      filter: { name: "", cohort: null },
      setFilter: vi.fn(),
    }),
  );

  location.href = new URL(`?member=test1`, location.href).toString();
  render(<Certificate />);

  const linkedInLink = screen.getByRole("link", {
    name: "링크드인 공유",
  });

  const certificateName = `Leetcode 75 ${gradeEmojiMap["SEED"]}`;
  const params = new URLSearchParams({
    startTask: "CERTIFICATION_NAME",
    name: certificateName,
    organizationId: "104834174",
    certUrl: location.href,
  });

  const expectedLinkedInURL = `https://www.linkedin.com/profile/add?${params.toString()}`;

  expect(linkedInLink).toHaveAttribute("href", expectedLinkedInURL);
  expect(linkedInLink).toHaveAttribute("target", "_blank");
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
  expect(screen.getByText(/오류가 발생했습니다/i)).toBeInTheDocument();
  expect(
    screen.getByText(
      /문제가 지속된다면 아래 Github Issue를 방문하여 문제를 보고하거나 진행 상황을 확인해 주시면 감사하겠습니다./i,
    ),
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /문제 보고하기/i })).toHaveAttribute(
    "href",
    "https://github.com/DaleStudy/leaderboard/issues",
  );
});
