import type { Meta, StoryObj } from "@storybook/react";
import Card from "./Card";
import { Grade } from "../../api/services/types";

const meta: Meta<typeof Card> = {
  component: Card,
};

export default meta;

export const Default: StoryObj<typeof Card> = {
  args: {
    id: "test",
    name: "test",
    cohort: 1,
    cohorts: [1],
    grade: Grade.SEED,
  },
};
