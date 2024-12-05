import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Layout from "./Layout";

test("renders the Header component", () => {
  render(
    <Layout>
      <div>Main Content</div>
    </Layout>,
  );

  const header = screen.getByRole("banner");
  expect(header).toBeInTheDocument();
});

test("renders the Footer component", () => {
  render(
    <Layout>
      <div>Main Content</div>
    </Layout>,
  );

  expect(screen.getByRole("contentinfo", { name: "Site Footer" }));
});

test("renders children passed to the Layout component", () => {
  render(
    <Layout>
      <div data-testid="content">Main Content</div>
    </Layout>,
  );

  const content = screen.getByTestId("content");
  expect(content).toBeInTheDocument();
  expect(content).toHaveTextContent("Main Content");
});
