import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import Link from "./Link";
import styles from "./Link.module.css";

test("render text link", () => {
  render(
    <Link variant="text" href="https://www.algodale.com">
      test
    </Link>,
  );

  const link = screen.getByRole("link", { name: "test" });
  expect(link).toHaveAttribute("href", "https://www.algodale.com");
  expect(link.className).includes(styles.text);
});

test("render primary button link", () => {
  render(
    <Link variant="primaryButton" href="https://www.algodale.com">
      test
    </Link>,
  );

  const link = screen.getByRole("link", { name: "test" });
  expect(link).toHaveAttribute("href", "https://www.algodale.com");
  expect(link.className).includes(styles.primaryButton);
});

test("render secondary link", () => {
  render(
    <Link variant="secondaryButton" href="https://www.algodale.com">
      test
    </Link>,
  );

  const link = screen.getByRole("link", { name: "test" });
  expect(link).toHaveAttribute("href", "https://www.algodale.com");
  expect(link.className).includes(styles.secondaryButton);
});
