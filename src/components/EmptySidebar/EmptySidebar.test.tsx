import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import EmptySidebar from "./EmptySidebar";
import styles from "./EmptySidebar.module.css";

test("renders EmptySidebar component", () => {
  render(<EmptySidebar />);

  const sidebar = screen.getByRole("complementary");
  expect(sidebar).toBeInTheDocument();

  const containerElement = screen.getByRole("complementary").firstChild;
  expect(containerElement).toHaveClass(styles.container);
});
