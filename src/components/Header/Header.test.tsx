import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

test("renders the page header", () => {
  render(<Header />);
  const header = screen.getByRole("banner");
  expect(header).toBeInTheDocument();
});

test("renders the link with correct href and accessible label", () => {
  render(<Header />);
  const linkElement = screen.getByRole("link", { name: /홈페이지로 이동/i });
  expect(linkElement).toHaveAttribute("href", "http://www.dalestudy.com");
});
