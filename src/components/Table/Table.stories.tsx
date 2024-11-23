import type { Meta, StoryObj } from "@storybook/react";
import Table from "./Table";

const meta: Meta<typeof Table> = {
  component: Table,
};

export default meta;

export const Default: StoryObj<typeof Table> = {
  args: {
    problems: [
      {
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        completed: true,
      },
      {
        id: 128,
        title: "Longest Consecutive Sequence",
        difficulty: "Med.",
        completed: false,
      },
      {
        id: 133,
        title: "Clone Graph",
        difficulty: "Med.",
        completed: true,
      },
      {
        id: 295,
        title: "Find Median From Data Stream",
        difficulty: "Hard",
        completed: false,
      },
    ],
  },
};