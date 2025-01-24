import type { Meta, StoryObj } from "@storybook/react";
import Unqualified from "./Unqualified";

export default {
  component: Unqualified,
} satisfies Meta<typeof Unqualified>;

export const Default: StoryObj<typeof Unqualified> = {
  args: {},
};
