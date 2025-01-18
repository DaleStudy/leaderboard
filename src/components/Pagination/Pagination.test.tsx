import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, vi, beforeEach, test } from "vitest";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  const onClickPrevious = vi.fn();
  const onClickNext = vi.fn();

  beforeEach(() => {
    onClickPrevious.mockClear();
    onClickNext.mockClear();
  });

  test("renders current page and total pages", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onClickPrevious={onClickPrevious}
        onClickNext={onClickNext}
      />,
    );

    expect(screen.getByLabelText("Page 2 of 5")).toBeInTheDocument();
  });

  test("disables previous button on the first page", async () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onClickPrevious={onClickPrevious}
        onClickNext={onClickNext}
      />,
    );
    const prevButton = screen.getByRole("button", {
      name: "이전 페이지로 이동",
    });
    expect(prevButton).toBeDisabled();
    expect(prevButton).toHaveAttribute("aria-disabled", "true");

    await userEvent.click(prevButton);
    expect(onClickPrevious).not.toHaveBeenCalled();
  });

  test("disables next button on the last page", async () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onClickPrevious={onClickPrevious}
        onClickNext={onClickNext}
      />,
    );
    const nextButton = screen.getByRole("button", {
      name: "다음 페이지로 이동",
    });
    expect(nextButton).toBeDisabled();
    expect(nextButton).toHaveAttribute("aria-disabled", "true");

    await userEvent.click(nextButton);
    expect(onClickNext).not.toHaveBeenCalled();
  });

  test("calls onClickPrevious when previous button is clicked", async () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onClickPrevious={onClickPrevious}
        onClickNext={onClickNext}
      />,
    );
    const prevButton = screen.getByRole("button", {
      name: "이전 페이지로 이동",
    });

    await userEvent.click(prevButton);
    expect(onClickPrevious).toHaveBeenCalledTimes(1);
  });

  test("calls onClickNext when next button is clicked", async () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onClickPrevious={onClickPrevious}
        onClickNext={onClickNext}
      />,
    );
    const nextButton = screen.getByRole("button", {
      name: "다음 페이지로 이동",
    });

    await userEvent.click(nextButton);
    expect(onClickNext).toHaveBeenCalledTimes(1);
  });

  test("displays aria-current attribute for the current page", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onClickPrevious={onClickPrevious}
        onClickNext={onClickNext}
      />,
    );

    const currentPage = screen.getByText("3");
    expect(currentPage).toHaveAttribute("aria-label", "현재 페이지");
  });
});
