import type { Meta, StoryObj } from "@storybook/react";
import Aside from "./Aside";

const meta = {
  component: Aside,
} satisfies Meta<typeof Aside>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    githubUsername: "testuser",
    easyTasks: "10",
    mediumTasks: "5",
    hardTasks: "2",
    solvedTasks: 17,
    totalTasks: 30,
  },
};

export const HighProgress: StoryObj<typeof meta> = {
  args: {
    ...Default.args,
    solvedTasks: 28,
    totalTasks: 30,
  },
};

export const NoTasks: StoryObj<typeof meta> = {
  args: {
    ...Default.args,
    easyTasks: "0",
    mediumTasks: "0",
    hardTasks: "0",
    solvedTasks: 0,
    totalTasks: 0,
  },
};
