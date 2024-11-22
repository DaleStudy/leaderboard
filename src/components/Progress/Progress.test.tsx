import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Progress from "./Progress"; // Adjust the import path as needed

describe("<Progress/>", () => {
  beforeEach(() => render(<Progress />));

  it("renders the table", () => {
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  it("renders the page header", () => {
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it("renders the title", () => {
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("풀이 현황");
  });

  it("renders footer", () => {
    expect(screen.getByRole("contentinfo"));
  });
});
