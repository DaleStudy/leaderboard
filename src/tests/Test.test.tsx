// import "@testing-library/dom";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Test } from "../components/Test";

test("text should be rendered", () => {
  render(<Test />);

  expect(screen.getByText("Test")).toBeInTheDocument();
});
