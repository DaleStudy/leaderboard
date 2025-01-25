import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterAll, expect, test, vi } from "vitest";
import { mock } from "vitest-mock-extended";

import type { Member, Problem } from "../../api/services/types";
import useMembers from "../../hooks/useMembers";
import { createMockMember, mockUseMembers } from "../../test-utils/useMembers";

import Certificate from "./Certificate";
import { gradeEmojiMap } from "./constants";

vi.mock("../../hooks/useMembers");

afterAll(() => {
  vi.mocked(window.print).mockRestore();
});

test("render the loading message while fetching members", () => {
  vi.mocked(useMembers).mockReturnValue(
    mock({ ...mockUseMembers, isLoading: true }),
  );

  render(<Certificate />);

  expect(screen.getByRole("status")).toHaveAccessibleName("스피너");
});

test("render the error message while fetching members", () => {
  vi.mocked(useMembers).mockReturnValue(
    mock({ ...mockUseMembers, error: new Error() }),
  );

  render(<Certificate />);

  expect(screen.getByText(/error/i)).toBeInTheDocument();
});

test("display error message if member is not found", () => {
  vi.mocked(useMembers).mockReturnValue(mock(mockUseMembers));

  render(<Certificate />);

  const heading = screen.getByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent("Page Not Found");
});

test("display error message if member is unqualified", () => {
  location.href = new URL(`?member=test1`, location.href).toString();
  vi.mocked(useMembers).mockReturnValue(
    mock({
      isLoading: false,
      error: null,
      members: [
        mock<Member>({
          id: "test1",
          name: "테스트1",
          grade: "LEAF",
          cohorts: [1],
        }),
      ],
      totalCohorts: 0,
      filter: { name: "", cohort: null },
      setFilter: vi.fn(),
    }),
  );

  render(<Certificate />);

  const heading = screen.getByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent(/you can do it/i);
});

test("render page title", () => {
  vi.mocked(useMembers).mockReturnValue(
    mock({
      ...mockUseMembers,
      members: [createMockMember({ id: "test1", grade: "TREE" })],
    }),
  );

  location.href = new URL(`?member=test1`, location.href).toString();
  render(<Certificate />);

  const heading = screen.getByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent("수료증");
});

test("render content id", () => {
  const members = [
    createMockMember({ id: "test1", grade: "TREE" }),
    createMockMember({ id: "test2", grade: "TREE" }),
  ];

  vi.mocked(useMembers).mockReturnValue(mock({ ...mockUseMembers, members }));

  members.forEach(({ id, name }) => {
    location.href = new URL(`?member=${id}`, location.href).toString();
    render(<Certificate />);

    expect(screen.getByRole("heading", { level: 4, name }));
  });
});

test("render content solved problems, cohort", () => {
  const members = [
    createMockMember({
      solvedProblems: Array(5).fill(mock<Problem>()),
      id: "test1",
      cohorts: [1],
      grade: "TREE",
    }),
    createMockMember({
      solvedProblems: Array(10).fill(mock<Problem>()),
      id: "test2",
      cohorts: [2],
      grade: "TREE",
    }),
    createMockMember({
      solvedProblems: Array(20).fill(mock<Problem>()),
      id: "test3",
      cohorts: [3],
      grade: "TREE",
    }),
    createMockMember({
      solvedProblems: Array(75).fill(mock<Problem>()),
      id: "test4",
      cohorts: [4],
      grade: "TREE",
    }),
  ];

  vi.mocked(useMembers).mockReturnValue(mock({ ...mockUseMembers, members }));

  const cohortSuffix = ["th", "st", "nd", "rd"];
  members.forEach(async ({ id, solvedProblems, cohorts }) => {
    location.href = new URL(`?member=${id}`, location.href).toString();
    render(<Certificate />);

    await waitFor(() => {
      expect(
        screen.getByText(
          new RegExp(
            `${solvedProblems.length === 75 ? "all" : solvedProblems.length} problems`,
            "i",
          ),
        ),
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          new RegExp(
            `${cohorts.at(-1)}${cohortSuffix?.[cohorts.at(-1) ?? 0] ?? "th"}`,
            "i",
          ),
        ),
      ).toBeInTheDocument();
    });
  });
});

test("render learderboard link", () => {
  vi.mocked(useMembers).mockReturnValue(
    mock({
      ...mockUseMembers,
      members: [
        createMockMember({ solvedProblems: [], id: "test1", grade: "TREE" }),
      ],
    }),
  );

  location.href = new URL(`?member=test1`, location.href).toString();
  render(<Certificate />);

  const linkList = screen.getAllByRole("link", {
    name: "리더보드로 돌아가기",
  });
  expect(linkList).toHaveLength(2);
  expect(linkList[0]).toHaveAttribute("href", `/`);
  expect(linkList[1]).toHaveAttribute("href", `/`);
});

test("render print button", () => {
  vi.mocked(useMembers).mockReturnValue(
    mock({
      isLoading: false,
      error: null,
      members: [mock<Member>({ id: "test1", name: "테스트1", cohorts: [1] })],
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
      members: [mock<Member>({ id: "test1", name: "테스트1", cohorts: [1] })],
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
      members: [
        mock<Member>({
          id: "test1",
          name: "테스트1",
          grade: "FRUIT",
          cohorts: [1],
        }),
      ],
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

  const certificateName = `Leetcode 75 ${gradeEmojiMap["FRUIT"]}`;
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
    mock({ ...mockUseMembers, error: new Error() }),
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
