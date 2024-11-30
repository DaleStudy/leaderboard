import type { Meta, StoryObj } from "@storybook/react";
import Certificate from "./Certificate";

const meta: Meta<typeof Certificate> = {
  component: Certificate,
  parameters: {
    query: {
      member: "sunjae95",
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Certificate> = {};
