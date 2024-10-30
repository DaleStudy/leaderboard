import { faker } from "@faker-js/faker";
import { afterAll, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Certificate from "./Certificate";

afterAll(() => {
  vi.mocked(window.print).mockRestore();
});

test("render title", () => {
  const username = faker.internet.displayName();
  location.href = new URL(`?member=${username}`, location.href).toString();

  render(<Certificate />);

  const heading = screen.getByRole("region", {
    name: `${username}님의 수료증`,
  });
  expect(heading).toBeInTheDocument();
});

test("render content", () => {
  render(<Certificate />);

  const content = screen.getByText("귀하는 어쩌구 저쩌구");
  expect(content).toBeInTheDocument();
});

test("render print button", () => {
  render(<Certificate />);

  const printButton = screen.getByRole("button", { name: "출력" });
  expect(printButton).toBeInTheDocument();
});

test("calls window.print when the print button is clicked", async () => {
  vi.spyOn(window, "print").mockImplementation(() => {});

  render(<Certificate />);

  const printButton = screen.getByRole("button", { name: "출력" });
  const user = userEvent.setup();
  await user.click(printButton);
  expect(window.print).toHaveBeenCalledOnce();
});

test("render LinkedIn link", () => {
  const username = faker.internet.displayName();
  location.href = new URL(`?member=${username}`, location.href).toString();

  render(<Certificate />);

  const linkedInLink = screen.getByRole("link", {
    name: "링크드인에 공유하기",
  });
  expect(linkedInLink).toHaveAttribute(
    "href",
    `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${username}&organizationId=104834174&certUrl=${location.href}`,
  );
});
