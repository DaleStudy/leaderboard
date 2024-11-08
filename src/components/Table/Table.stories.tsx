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
        title: "Example Problem 1",
        difficulty: "Easy",
        completed: true,
      },
    ],
  },
};
