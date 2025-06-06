import type { Meta, StoryObj } from "@storybook/react";
import Sidebar from "./Sidebar.tsx";

const meta = {
  component: Sidebar,
  args: {
    githubUsername: "testuser",
    easyProgress: "5/10",
    mediumProgress: "8/10",
    hardProgress: "3/5",
    solvedProblems: 16,
    totalProblems: 25,
    profileUrl: "https://avatars.githubusercontent.com/u/104721736?v=4",
    cohorts: [1, 2, 3],
    grade: "LEAF",
  },
} satisfies Meta<typeof Sidebar>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    easyProgress: "5/10",
    mediumProgress: "8/10",
    hardProgress: "3/5",
    solvedProblems: 16,
    totalProblems: 25,
    grade: "LEAF",
    cohorts: [1, 2, 3],
    githubUsername: "testuser",
    profileUrl: "https://avatars.githubusercontent.com/u/104721736?v=4",
  },
};

export const HighProgress: StoryObj<typeof meta> = {
  args: {
    solvedProblems: 28,
    totalProblems: 30,
    easyProgress: "10/10",
    mediumProgress: "10/10",
    hardProgress: "8/10",
    grade: "FRUIT",
    cohorts: [1, 2, 3],
    githubUsername: "testuser",
    profileUrl: "https://avatars.githubusercontent.com/u/104721736?v=4",
  },
};

export const NoProblems: StoryObj<typeof meta> = {
  args: {
    easyProgress: "0/0",
    mediumProgress: "0/0",
    hardProgress: "0/0",
    solvedProblems: 0,
    totalProblems: 0,
    grade: "SEED",
    cohorts: [1, 2, 3],
    githubUsername: "testuser",
    profileUrl: "https://avatars.githubusercontent.com/u/104721736?v=4",
  },
};

export const Error: StoryObj<typeof meta> = {
  args: {
    isError: true,
  },
};
