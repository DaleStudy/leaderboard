import type { Meta, StoryObj } from "@storybook/react";
import EmptySidebar from "./EmptySidebar";

const meta = {
  component: EmptySidebar,
} satisfies Meta<typeof EmptySidebar>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {},
};
