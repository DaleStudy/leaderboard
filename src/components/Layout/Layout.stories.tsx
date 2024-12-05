import type { Meta, StoryObj } from "@storybook/react";
import Layout from "./Layout";

const meta = {
  component: Layout,
} satisfies Meta<typeof Layout>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    children: (
      <main style={{ paddingTop: 100, height: 1000, textAlign: "center" }}>
        <h1>👋 Welcome to the Layout component!</h1>
        <p>This is the main content area.</p>
      </main>
    ),
  },
};
