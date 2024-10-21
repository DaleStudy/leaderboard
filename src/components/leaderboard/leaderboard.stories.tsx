import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Leaderboard from "./leaderboard";

const pathname = `/leaderboard`;

const meta = {
  component: Leaderboard,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={[pathname]}>
        <Routes>
          <Route path="/leaderboard" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Leaderboard>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
