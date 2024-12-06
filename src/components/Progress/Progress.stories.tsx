import type { Meta, StoryObj } from "@storybook/react";
import Progress from "./Progress";
import { http, HttpResponse } from "msw";

const meta: Meta<typeof Progress> = {
  component: Progress,
  parameters: {
    query: {
      member: "evan",
    },
    msw: {
      handlers: [
        http.get("https://api.example.com/members", () =>
          HttpResponse.json([
            {
              id: "evan",
              name: "soundmin",
              cohort: 3,
              grade: "A",
              profileUrl: "https://example.com/avatar.png",
              solvedProblems: [
                { id: 31, title: "Problem 1", difficulty: "Easy" },
                { id: 52, title: "Problem 2", difficulty: "Medium" },
                { id: 30, title: "Problem 3", difficulty: "Hard" },
              ],
            },
          ]),
        ),
      ],
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Progress> = {};
