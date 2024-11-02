import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Footer from "./Footer";

test("render left menu", () => {
  render(<Footer />);

  [
    {
      label: "FAQ",
      link: "https://github.com/DaleStudy/leetcode-study/discussions",
    },
    {
      label: "Apply",
      link: "https://github.com/DaleStudy/leetcode-study/discussions/209",
    },
    {
      label: "Guide",
      link: "https://github.com/DaleStudy/leetcode-study/blob/main/CONTRIBUTING.md",
    },
  ].forEach(({ label, link }) => {
    const childMenu = screen.getByRole("link", { name: label });
    expect(childMenu).toHaveAttribute("href", link);
  });
});

test("render right menu", () => {
  render(<Footer />);

  [
    {
      label: "Blog",
      link: "https://www.algodale.com",
    },
    {
      label: "LinkedIn",
      link: "https://www.linkedin.com/in/daleseo",
    },
    {
      label: "Github",
      link: "https://github.com/DaleStudy/leetcode-study",
    },
    {
      label: "Youtube",
      link: "https://www.youtube.com/@DaleSeo",
    },
  ].forEach(({ label, link }) => {
    const childMenu = screen.getByRole("link", { name: label });
    expect(childMenu).toHaveAttribute("href", link);
  });
});

test("render copyright", () => {
  render(<Footer />);

  const copyright = screen.getByText("© 2024 DaleStudy. All rights reserved.");
  expect(copyright).toBeInTheDocument();
});
