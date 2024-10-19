import { afterAll, beforeEach, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Certificate from "./Certificate";

const username = "testUser";
const pathname = `/members/${username}/certificate`;

beforeEach(() => {
  render(
    <MemoryRouter initialEntries={[pathname]}>
      <Routes>
        <Route path="/members/:member/certificate" element={<Certificate />} />
      </Routes>
    </MemoryRouter>,
  );
});

afterAll(() => {
  vi.mocked(window.print).mockRestore();
});

test("render title", () => {
  const heading = screen.getByRole("region", {
    name: `${username}님의 수료증`,
  });
  expect(heading).toBeInTheDocument();
});

test("render content", () => {
  const content = screen.getByText("귀하는 어쩌구 저쩌구");
  expect(content).toBeInTheDocument();
});

test("render print button", () => {
  const printButton = screen.getByRole("button", { name: "출력" });
  expect(printButton).toBeInTheDocument();
});

test("calls window.print when the print button is clicked", async () => {
  vi.spyOn(window, "print").mockImplementation(() => {});
  const printButton = screen.getByRole("button", { name: "출력" });
  const user = userEvent.setup();
  await user.click(printButton);
  expect(window.print).toHaveBeenCalledOnce();
});

test("render LinkedIn link", () => {
  const linkedInLink = screen.getByRole("link", {
    name: "링크드인에 공유하기",
  });
  expect(linkedInLink).toHaveAttribute(
    "href",
    `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${username}&organizationId=104834174&certUrl=${pathname}`,
  );
});
