import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import Certificate from "./Certificate";

const username = "testUser";
const pathname = `/members/${username}/certificate`;

const meta: Meta<typeof Certificate> = {
  component: Certificate,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={[pathname]}>
        <Routes>
          <Route path="/members/:member/certificate" element={<Story />} />
        </Routes>
      </MemoryRouter>
    ),
  ],
};

export default meta;

export const Default: StoryObj<typeof Certificate> = {};
