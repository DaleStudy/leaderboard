import { beforeEach, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

beforeEach(() => {
  render(<Header />);
});

test("renders the header element", () => {
  const header = screen.getByRole("banner");
  expect(header).toBeInTheDocument();
});

test("renders the link with correct href and accessible label", () => {
  const linkElement = screen.getByRole("link", { name: /go to the homepage/i });
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveAttribute("href", "http://www.dalestudy.com");
});
