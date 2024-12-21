import type { Meta, StoryObj } from "@storybook/react";
import Card from "./GradeImage";
import { Grade } from "../../api/services/types";

const meta: Meta<typeof Card> = {
  component: Card,
  args: {
    grade: Grade.SEED,
    width: 105,
    height: 128,
  },
};

export default meta;

export const Seed: StoryObj<typeof Card> = {
  args: {
    grade: Grade.SEED,
    width: 105,
    height: 128,
  },
};
