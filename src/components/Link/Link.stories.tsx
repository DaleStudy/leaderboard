import type { Meta, StoryObj } from "@storybook/react";
import Link from "./Link";

const meta = {
  component: Link,
} satisfies Meta<typeof Link>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    variant: "text",
    children: "test",
    tabIndex: 0,
  },
};

export const PrimaryButton: StoryObj<typeof meta> = {
  args: {
    ...Default.args,
    variant: "primaryButton",
  },
};

export const SecondaryButton: StoryObj<typeof meta> = {
  args: {
    ...Default.args,
    variant: "secondaryButton",
  },
};
