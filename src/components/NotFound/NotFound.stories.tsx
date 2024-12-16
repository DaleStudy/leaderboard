import type { Meta, StoryObj } from "@storybook/react";

import NotFound from "./NotFound";

const meta = {
  component: NotFound,
} satisfies Meta<typeof NotFound>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
