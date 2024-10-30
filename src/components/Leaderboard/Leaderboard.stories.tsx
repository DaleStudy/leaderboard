import type { Meta, StoryObj } from "@storybook/react";
import Leaderboard from "./Leaderboard";

const meta = {
  component: Leaderboard,
} satisfies Meta<typeof Leaderboard>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
