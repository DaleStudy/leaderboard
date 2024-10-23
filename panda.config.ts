import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./stories/**/*.{js,jsx,ts,tsx}",
  ],

  // Files to exclude
  exclude: [],

  // The output directory for your css system
  outdir: "styled-system",

  /** @see https://panda-css.com/docs/theming/tokens#core-tokens */
  theme: {
    tokens: {
      colors: {
        danger: {
          value: "#EE0F0F",
          description: "Color for errors",
        },
      },
    },

    extend: {},
  },
});
