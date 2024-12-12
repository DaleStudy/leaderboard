import type { Meta, StoryObj } from "@storybook/react";
import ServerError from "./ServerError";

const meta = {
  component: ServerError,
} satisfies Meta<typeof ServerError>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {},
};
