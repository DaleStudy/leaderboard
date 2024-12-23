import type { Meta, StoryObj } from "@storybook/react";
import Card from "./GradeImage";

const meta: Meta<typeof Card> = {
  component: Card,
  args: {
    grade: "SEED",
    width: 105,
    height: 128,
  },
};

export default meta;

export const Default: StoryObj<typeof Card> = {};
