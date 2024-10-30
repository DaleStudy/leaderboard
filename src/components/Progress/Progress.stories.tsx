import type { Meta, StoryObj } from "@storybook/react";
import Progress from "./Progress";

const meta = {
  component: Progress,
} satisfies Meta<typeof Progress>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
