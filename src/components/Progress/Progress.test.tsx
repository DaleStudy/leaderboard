import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import Progress from "./Progress"; // Adjust the import path as needed

describe("<Progress/>", () => {
  beforeEach(() => render(<Progress />));

  it("renders the page header", () => {
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it("renders the title", () => {
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Progress");
  });

  it("renders the profile information", () => {
    const profileSection = screen.getByRole("heading", {
      level: 2,
      name: /Profile Section/i,
    });
    expect(profileSection).toBeInTheDocument();

    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "0 Attempting",
    );
    expect(screen.getByText(/^Easy: \d{1,2}\/\d{1,2}$/)).toBeInTheDocument();
    expect(screen.getByText(/^Med.: \d{1,2}\/\d{1,2}$/)).toBeInTheDocument();
    expect(screen.getByText(/^Hard: \d{1,2}\/\d{1,2}$/)).toBeInTheDocument();
  });

  it("renders the task list", () => {
    const taskItems = within(
      screen.getByRole("region", { name: "Task List" }),
    ).getAllByRole("listitem");
    expect(taskItems).toHaveLength(4); // Since there are 4 tasks defined

    const expectedTasks = [
      { title: "Longest Consecutive Sequence", difficulty: "Med." },
      { title: "Two Sum", difficulty: "Easy" },
      { title: "Binary Tree Paths", difficulty: "Easy" },
      { title: "Clone Graph", difficulty: "Med." },
    ];

    expectedTasks.forEach((task, index) => {
      const taskItem = taskItems[index];
      expect(taskItem).toHaveTextContent(task.title);
      expect(taskItem).toHaveTextContent(task.difficulty);
    });
  });

  it("renders footer", () => {
    expect(screen.getByRole("contentinfo"));
  });
});
