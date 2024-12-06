import type { Meta, StoryObj } from "@storybook/react";
import Spinner from "./Spinner";

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  decorators: [
    (Story) => {
      return (
        <div
          style={{
            display: "flex",
            width: "100vw",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
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
