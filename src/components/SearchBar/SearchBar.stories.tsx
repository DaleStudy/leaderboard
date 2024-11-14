import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import SearchBar from "./SearchBar";

const meta = {
  component: SearchBar,
} satisfies Meta<typeof SearchBar>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    onSearch: fn(),
    totalCohorts: 5,
  },
};
