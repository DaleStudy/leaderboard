import { expect, test, vi } from "vitest";
import { mock } from "vitest-mock-extended";
import { render, screen } from "@testing-library/react";
import type { Member } from "../../api/services/types";
import useMembers from "../../hooks/useMembers";
import Leaderboard from "./Leaderboard";

vi.mock("../../hooks/useMembers");

test("render the loading message while fetching members", () => {
  vi.mocked(useMembers).mockReturnValue(
    mock({ isLoading: true, error: null, members: [] }),
  );

  render(<Leaderboard />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test("render the error message while fetching members", () => {
  vi.mocked(useMembers).mockReturnValue(
    mock({ isLoading: false, error: new Error(), members: [] }),
  );

  render(<Leaderboard />);

  expect(screen.getByText(/error/i)).toBeInTheDocument();
});

test("render the site header", () => {
  vi.mocked(useMembers).mockReturnValue(
    mock({ isLoading: false, error: null, members: [] }),
  );

  render(<Leaderboard />);

  const header = screen.getByRole("banner");
  expect(header).toBeInTheDocument();
});

test("render the page title", () => {
  vi.mocked(useMembers).mockReturnValue(
    mock({ isLoading: false, error: null, members: [] }),
  );

  render(<Leaderboard />);
  const heading = screen.getByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent("리더보드");
});

test("render the member cards", () => {
  const members = [
    mock<Member>(),
    mock<Member>(),
    mock<Member>(),
    mock<Member>(),
    mock<Member>(),
    mock<Member>(),
  ];

  vi.mocked(useMembers).mockReturnValue(
    mock({ isLoading: false, error: null, members }),
  );

  render(<Leaderboard />);

  const memberCards = screen.getAllByRole("article");

  expect(memberCards).toHaveLength(members.length);
});

test("render the site footer", () => {
  vi.mocked(useMembers).mockReturnValue(
    mock({ isLoading: false, error: null, members: [mock<Member>()] }),
  );

  render(<Leaderboard />);

  expect(screen.getByRole("contentinfo", { name: "Site Footer" }));
});
