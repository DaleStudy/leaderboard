import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import Spinner from "./Spinner";

test("renders the loading", () => {
  render(<Spinner />);
  const loading = screen.getByRole("status");
  expect(loading).toHaveAccessibleName(/스피너/i);
});
