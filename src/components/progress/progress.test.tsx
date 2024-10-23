import { beforeEach, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Progress from "./progress"; // Adjust the import path as needed

describe("<Progress/>", () => {
  beforeEach(() => {
    render(<Progress />);
  });

  test("renders the title", () => {
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Progress");
  });

  test("renders the profile information", () => {
    const profileSection = screen.getByRole("heading", {
      level: 2,
      name: /Profile Section/i,
    });
    expect(profileSection).toBeInTheDocument();

    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "0 Attempting",
    );
    expect(screen.getByText(/Easy: 12\/12/i)).toBeInTheDocument();
    expect(screen.getByText(/Med.: 22\/22/i)).toBeInTheDocument();
    expect(screen.getByText(/Hard: 1\/1/i)).toBeInTheDocument();
  });

  test("renders the task list", () => {
    const taskItems = screen.getAllByRole("listitem");
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
});
