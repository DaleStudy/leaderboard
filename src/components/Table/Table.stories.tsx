import type { Meta, StoryObj } from "@storybook/react";
import Table from "./Table";

const meta: Meta<typeof Table> = {
  component: Table,
  args: {
    problems: [
      {
        id: "1",
        title: "Two Sum",
        difficulty: "Easy",
      },
      {
        id: "128",
        title: "Longest Consecutive Sequence",
        difficulty: "Med",
      },
      {
        id: "133",
        title: "Clone Graph",
        difficulty: "Med",
      },
      {
        id: "295",
        title: "Find Median From Data Stream",
        difficulty: "Hard",
      },
    ],
    solvedProblems: [
      {
        id: "1",
        title: "Two Sum",
        difficulty: "Easy",
      },
      {
        id: "133",
        title: "Clone Graph",
        difficulty: "Med",
      },
    ],
  },
};

export default meta;

export const Default: StoryObj<typeof Table> = {};

export const AllCompleted: StoryObj<typeof Table> = {
  args: {
    problems: [
      {
        id: "1",
        title: "Two Sum",
        difficulty: "Easy",
      },
      {
        id: "128",
        title: "Longest Consecutive Sequence",
        difficulty: "Med",
      },
      {
        id: "133",
        title: "Clone Graph",
        difficulty: "Med",
      },
      {
        id: "295",
        title: "Find Median From Data Stream",
        difficulty: "Hard",
      },
    ],
    solvedProblems: [
      {
        id: "1",
        title: "Two Sum",
        difficulty: "Easy",
      },
      {
        id: "128",
        title: "Longest Consecutive Sequence",
        difficulty: "Med",
      },
      {
        id: "133",
        title: "Clone Graph",
        difficulty: "Med",
      },
      {
        id: "295",
        title: "Find Median From Data Stream",
        difficulty: "Hard",
      },
    ],
  },
};

export const NoCompletedProblems: StoryObj<typeof Table> = {
  args: {
    problems: [
      {
        id: "1",
        title: "Two Sum",
        difficulty: "Easy",
      },
      {
        id: "128",
        title: "Longest Consecutive Sequence",
        difficulty: "Med",
      },
      {
        id: "133",
        title: "Clone Graph",
        difficulty: "Med",
      },
      {
        id: "295",
        title: "Find Median From Data Stream",
        difficulty: "Hard",
      },
    ],
    solvedProblems: [],
  },
};
