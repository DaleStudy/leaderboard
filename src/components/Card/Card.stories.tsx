import type { Meta, StoryObj } from "@storybook/react";
import Card from "./Card";
import { Grade } from "../../api/services/types";

const meta: Meta<typeof Card> = {
  component: Card,
  args: {
    id: "test",
  },
};

export default meta;

export const Seed: StoryObj<typeof Card> = {
  args: {
    name: "seed",
    grade: Grade.SEED,
    cohorts: [1],
  },
};

export const Sprout: StoryObj<typeof Card> = {
  args: {
    name: "sprout",
    grade: Grade.SPROUT,
    cohorts: [2],
  },
};

export const Leaf: StoryObj<typeof Card> = {
  args: {
    name: "leaf",
    grade: Grade.LEAF,
    cohorts: [3],
  },
};

export const Branch: StoryObj<typeof Card> = {
  args: {
    name: "branch",
    grade: Grade.BRANCH,
    cohorts: [4],
  },
};

export const Fruit: StoryObj<typeof Card> = {
  args: {
    name: "fruit",
    grade: Grade.FRUIT,
    cohorts: [5],
  },
};

export const Tree: StoryObj<typeof Card> = {
  args: {
    name: "tree",
    grade: Grade.TREE,
    cohorts: [6],
  },
};
