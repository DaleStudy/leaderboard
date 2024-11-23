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
    easyTasks: "5/10",
    mediumTasks: "8/10",
    hardTasks: "3/5",
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
    easyTasks: "10/10",
    mediumTasks: "10/10",
    hardTasks: "8/10",
    grade: Grade.BIG_TREE, // Higher grade for more progress
  },
};

export const NoTasks: StoryObj<typeof meta> = {
  args: {
    ...Default.args,
    easyTasks: "0/0",
    mediumTasks: "0/0",
    hardTasks: "0/0",
    solvedTasks: 0,
    totalTasks: 0,
    grade: Grade.SEED, // Minimal grade due to no tasks solved
  },
};
