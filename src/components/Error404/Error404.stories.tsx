import type { Meta, StoryObj } from "@storybook/react";

import Error404 from "./Error404";

const meta = {
  component: Error404,
} satisfies Meta<typeof Error404>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
