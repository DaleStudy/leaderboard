import type { Meta, StoryObj } from "@storybook/react";
import Spinner from "./Spinner";

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  args: { variant: "full" },
  decorators: [
    (Story, context) => {
      return (
        <div
          style={{
            height: context.args.variant === "full" ? "100%" : "400px",
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default meta;

export const Default: StoryObj<typeof Spinner> = {};

export const Compact: StoryObj<typeof Spinner> = {
  args: { variant: "compact" },
};
