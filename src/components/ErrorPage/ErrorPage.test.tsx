import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import { useRouteError } from "react-router-dom";
import { expect, test, vi } from "vitest";
import ErrorPage from "./ErrorPage";

vi.mock("react-router-dom");

test("displays the title and message", () => {
  vi.mocked(useRouteError).mockReturnValue({
    statusText: faker.lorem.text(),
    message: faker.lorem.sentence(),
  });

  render(<ErrorPage />);

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/oops!/i);
  expect(
    screen.getByText(/sorry, an unexpected error has occurred./i),
  ).toBeInTheDocument();
});

test("displays the status text when available", () => {
  const statusText = faker.lorem.text();
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