import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Progress from "./progress";

const username = "testUser";

const pathname = `/progress?member=${username}`;

const meta = {
  component: Progress,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={[pathname]}>
        <Routes>
          <Route path="/progress" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof Progress>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
