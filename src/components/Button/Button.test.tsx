import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

import Button from "./Button";
import styles from "./Button.module.css";

beforeEach(() => {
  vi.useFakeTimers();
});
afterEach(() => {
  vi.restoreAllMocks();
});

test("render primary button", () => {
  render(<Button variant="primary">test</Button>);

  const button = screen.getByRole("button", { name: "test" });

  expect(button.className).includes(styles.primary);
});

test("render secondary button", () => {
  render(<Button variant="secondary">test</Button>);

  const button = screen.getByRole("button", { name: "test" });

  expect(button.className).includes(styles.secondary);
});

test("debounce 300ms one click", async () => {
  const mockOnClick = vi.fn();

  render(
    <Button variant="primary" delay={300} onClick={mockOnClick}>
      test
    </Button>,
  );

  const button = screen.getByRole("button", { name: "test" });

  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);

  await vi.advanceTimersByTimeAsync(300);

  expect(mockOnClick).toHaveBeenCalledOnce();
});
