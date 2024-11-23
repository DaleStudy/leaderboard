import type { Meta, StoryObj } from "@storybook/react";
import Aside from "./Aside";
import { Grade } from "../../api/services/common/types.ts";

const meta = {
  component: Aside,
} satisfies Meta<typeof Aside>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    githubUsername: "testuser",
    easyProgress: "5/10",
    mediumProgress: "8/10",
    hardProgress: "3/5",
    solvedTasks: 16,
    totalTasks: 25,
    profile_url: "https://example.com/profile.jpg", // Provide a valid URL or mock
    cohort: 3,
    grade: Grade.SMALL_TREE, // Assign an appropriate grade here
  },
};

export const HighProgress: StoryObj<typeof meta> = {
  args: {
    ...Default.args,
    solvedTasks: 28,
    totalTasks: 30,
    easyProgress: "10/10",
    mediumProgress: "10/10",
    hardProgress: "8/10",
    grade: Grade.BIG_TREE, // Higher grade for more progress
  },
};

export const NoTasks: StoryObj<typeof meta> = {
  args: {
    ...Default.args,
    easyProgress: "0/0",
    mediumProgress: "0/0",
    hardProgress: "0/0",
    solvedTasks: 0,
    totalTasks: 0,
    grade: Grade.SEED, // Minimal grade due to no tasks solved
  },
};
