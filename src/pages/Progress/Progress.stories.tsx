import type { Meta, StoryObj } from "@storybook/react";
import Progress from "./Progress";
import { http, HttpResponse } from "msw";

const meta: Meta<typeof Progress> = {
  component: Progress,
  parameters: {
    query: {
      member: "sunjae95",
    },
    msw: {
      handlers: [
        http.get("https://api.github.com/orgs/DaleStudy/teams", () =>
          HttpResponse.json([{ name: "leetcode02" }]),
        ),
        http.get(
          "https://api.github.com/orgs/DaleStudy/teams/leetcode02/members",
          () =>
            HttpResponse.json([
              {
                login: "Sunjae95",
                avatar_url:
                  "https://avatars.githubusercontent.com/u/63578094?v=4",
              },
            ]),
        ),
      ],
    },
  },
};

export default meta;

export const Default: StoryObj<typeof meta> = {};

export const NotFound: StoryObj<typeof meta> = {
  parameters: {
    query: {
      member: "sunjae9",
    },
  },
};
