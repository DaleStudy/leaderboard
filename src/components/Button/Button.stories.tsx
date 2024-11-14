import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Button from "./Button";

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    variant: "primary",
    children: "test",
    onClick: fn(),
  },
};

export const Secondary: StoryObj<typeof meta> = {
  args: { ...Default.args, variant: "secondary" },
};
