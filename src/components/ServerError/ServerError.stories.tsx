import type { Meta, StoryObj } from "@storybook/react-vite";
import ServerError from "./ServerError";

const meta = {
  component: ServerError,
} satisfies Meta<typeof ServerError>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {},
};
