import type { Meta, StoryObj } from "@storybook/react";
import Error500 from "./Error500";

const meta = {
  component: Error500,
} satisfies Meta<typeof Error500>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {},
};
