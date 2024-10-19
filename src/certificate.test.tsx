import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Certificate from "./certificate";

const username = "testUser";
const pathname = `/members/${username}/certificate`;

describe("Certificate Page", () => {
  beforeEach(() =>
    render(
      <MemoryRouter initialEntries={[pathname]}>
        <Routes>
          <Route
            path="/members/:username/certificate"
            element={<Certificate />}
          />
        </Routes>
      </MemoryRouter>,
    ),
  );

  test("render the correct title", () => {
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent(`${username}님의 수료증`);
  });

  test("render the correct content", () => {
    const content = screen.getByText("귀하는 어쩌구 저쩌구");
    expect(content).toBeInTheDocument();
  });

  test("render the correct print button", () => {
    const printButton = screen.getByRole("button", { name: "출력" });
    expect(printButton).toBeInTheDocument();
  });

  test("calls window.print when the print button is clicked", async () => {
    vi.spyOn(window, "print").mockImplementation(() => {});
    const printButton = screen.getByRole("button", { name: "출력" });
    await userEvent.click(printButton);
    expect(window.print).toHaveBeenCalledOnce();
  });

  test("render LinkedIn share link with the correct URL", () => {
    const linkedInLink = screen.getByRole("link", {
      name: "링크드인에 공유하기",
    });
    expect(linkedInLink).toHaveAttribute(
      "href",
      `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${username}&organizationId=104834174&certUrl=${pathname}`,
    );
  });
});
