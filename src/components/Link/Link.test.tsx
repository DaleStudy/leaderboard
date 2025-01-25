import { faker } from "@faker-js/faker";
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

test("setting the `disabled` prop to `true` disables the link", () => {
  render(
    <Link disabled href="https://www.algodale.com" variant="primaryButton">
      test
    </Link>,
  );

  expect(screen.getByText(/test/i)).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: "test" })).not.toBeInTheDocument();
});

test("the `disabled` prop is only supported for the primaryButton variant", () => {
  const variant = faker.helpers.arrayElement(["text", "secondaryButton"]);

  expect(() =>
    render(
      <Link disabled href="https://www.algodale.com" variant={variant}>
        test
      </Link>,
    ),
  ).toThrow(
    "The `disabled` prop is only supported for the primaryButton variant",
  );
});
