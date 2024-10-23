import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import { useRouteError } from "react-router-dom";
import { afterAll, beforeAll, expect, test, vi } from "vitest";
import ErrorPage from "./ErrorPage";

vi.mock("react-router-dom");

beforeAll(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  vi.mocked(console.error).mockRestore();
});

test("displays the title and message", () => {
  vi.mocked(useRouteError).mockReturnValue({
    statusText: faker.lorem.sentence(),
    message: faker.lorem.sentence(),
  });

  render(<ErrorPage />);

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/oops!/i);
  expect(
    screen.getByText(/sorry, an unexpected error has occurred./i),
  ).toBeInTheDocument();
});

test("displays the status text when available", () => {
  const statusText = faker.lorem.sentence();
  const message = faker.lorem.sentence();

  vi.mocked(useRouteError).mockReturnValue({ statusText, message });

  render(<ErrorPage />);

  expect(screen.getByText(new RegExp(statusText, "i"))).toBeInTheDocument();
});

test("displays the error message when status text is not available", () => {
  const statusText = "";
  const message = faker.lorem.sentence();

  vi.mocked(useRouteError).mockReturnValue({ statusText, message });

  render(<ErrorPage />);

  expect(screen.getByText(new RegExp(message, "i"))).toBeInTheDocument();
});
