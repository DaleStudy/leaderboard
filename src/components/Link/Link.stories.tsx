import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Link from "./Link";

const meta = {
  component: Link,
  args: {
    href: "https://www.algodale.com",
    variant: "text",
    children: "AlgoDale",
    onClick: fn(),
  },
} satisfies Meta<typeof Link>;

export default meta;

export const Default: StoryObj<typeof meta> = {};

export const PrimaryButton: StoryObj<typeof meta> = {
  args: {
    variant: "primaryButton",
  },
};

export const SecondaryButton: StoryObj<typeof meta> = {
  args: {
    variant: "secondaryButton",
  },
};
