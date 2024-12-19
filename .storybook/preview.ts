import "../src/index.css";
import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from "msw-storybook-addon";

// Initialize MSW
initialize();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ["autodocs"],
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
};

export default preview;
