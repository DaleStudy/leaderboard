import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Progress from "./Progress";
import { mock } from "vitest-mock-extended";
import useMembers from "../../hooks/useMembers";
import { test, vi } from "vitest";

vi.mock("../../hooks/useMembers");

test("render the site header", () => {
  vi.mocked(useMembers).mockReturnValue(
    mock({ isLoading: false, error: null, members: [] }),
  );

  render(<Progress />);

  const header = screen.getByRole("banner");
  expect(header).toBeInTheDocument();
});
