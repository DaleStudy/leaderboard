/// <reference lib="dom" />

import "../src/index.css";
import type { Preview } from "@storybook/react-vite";
import { initialize, mswLoader } from "msw-storybook-addon";
import { useEffect } from "react";
import React from "react";

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
    docs: {
      toc: true,
    },
  },
  tags: ["autodocs"],
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
  decorators: [
    (Story, context) => {
      const QueryParamsDecorator = () => {
        useEffect(() => {
          const queryParams = context.parameters?.query;
          if (queryParams && typeof queryParams === "object") {
            const url = new URL(window.location.href);
            Object.entries(queryParams).forEach(([key, value]) => {
              if (value) {
                url.searchParams.set(key, String(value));
              }
            });
            window.history.replaceState({}, "", url.toString());
          }
        }, []);

        return React.createElement(Story);
      };

      return React.createElement(QueryParamsDecorator);
    },
  ],
};

export default preview;
