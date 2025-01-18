import { afterEach, test, expect } from "vitest";
import { render } from "@testing-library/react";
import Meta from "./Meta";

afterEach(() => {
  document.head.innerHTML = "";
  document.title = "";
});

test("sets the document title", () => {
  render(<Meta title="Test Page" />);

  expect(document.title).toBe("Test Page");
});

test("sets the meta description", () => {
  render(<Meta title="Test Page" description="This is a test description." />);

  const meta = document.querySelector("meta[name='description']");
  expect(meta).toBeInTheDocument();
  expect(meta).toHaveAttribute("content", "This is a test description.");
});

test("creates and sets the Open Graph title meta tag", () => {
  render(<Meta title="Test Page" />);

  const ogTitle = document.querySelector("meta[property='og:title']");
  expect(ogTitle).toBeInTheDocument();
  expect(ogTitle).toHaveAttribute("content", "Test Page");
});

test("creates and sets the Open Graph URL meta tag", () => {
  render(<Meta title="Test Page" url="https://example.com/test" />);

  const ogUrl = document.querySelector("meta[property='og:url']");
  expect(ogUrl).toBeInTheDocument();
  expect(ogUrl).toHaveAttribute("content", "https://example.com/test");
});

test("does not create meta tags when optional props are not provided", () => {
  render(<Meta title="Only Title" />);

  const metaDescription = document.querySelector("meta[name='description']");
  const ogUrl = document.querySelector("meta[property='og:url']");
  expect(metaDescription).not.toBeInTheDocument();
  expect(ogUrl).not.toBeInTheDocument();
});

test("updates existing meta tags instead of creating new ones", () => {
  const existingMeta = document.createElement("meta");
  existingMeta.name = "description";
  existingMeta.content = "Old description";
  document.head.appendChild(existingMeta);

  render(<Meta title="Updated Title" description="New description" />);

  const metaDescription = document.querySelector("meta[name='description']");
  expect(metaDescription).toBeInTheDocument();
  expect(metaDescription).toHaveAttribute("content", "New description");
  expect(document.title).toBe("Updated Title");
});
