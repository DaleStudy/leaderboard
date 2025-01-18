import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, vi, beforeEach, test } from "vitest";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  const onPageChange = vi.fn();

  beforeEach(() => {
    onPageChange.mockClear();
  });

  test("renders current page and total pages", () => {
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />,
    );

    expect(screen.getByLabelText("Page 2 of 5")).toBeInTheDocument();
  });

  test("disables previous button on the first page", async () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />,
    );
    const prevButton = screen.getByRole("button", {
      name: "Go to previous page",
    });
    expect(prevButton).toBeDisabled();
    expect(prevButton).toHaveAttribute("aria-disabled", "true");

    // Clicking the disabled button should not trigger onPageChange
    await userEvent.click(prevButton);
    expect(onPageChange).not.toHaveBeenCalled();
  });

  test("disables next button on the last page", async () => {
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />,
    );
    const nextButton = screen.getByRole("button", { name: "Go to next page" });
    expect(nextButton).toBeDisabled();
    expect(nextButton).toHaveAttribute("aria-disabled", "true");

    // Clicking the disabled button should not trigger onPageChange
    await userEvent.click(nextButton);
    expect(onPageChange).not.toHaveBeenCalled();
  });

  test("calls onPageChange with the previous page number", async () => {
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />,
    );
    const prevButton = screen.getByRole("button", {
      name: "Go to previous page",
    });

    await userEvent.click(prevButton);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  test("calls onPageChange with the next page number", async () => {
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />,
    );
    const nextButton = screen.getByRole("button", { name: "Go to next page" });

    await userEvent.click(nextButton);
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  test("shows aria-current attribute for the current page", () => {
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />,
    );
    const currentPage = screen.getByText("3");
    expect(currentPage).toHaveAttribute("aria-current", "page");
  });
});
