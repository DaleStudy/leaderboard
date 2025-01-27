import type { Meta, StoryObj } from "@storybook/react";
import { delay, http, HttpResponse } from "msw";

import Certificate from "./Certificate";

const meta: Meta<typeof Certificate> = {
  component: Certificate,
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

export const Default: StoryObj<typeof Certificate> = {};

export const Loading: StoryObj<typeof meta> = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://api.github.com/orgs/DaleStudy/teams", async () => {
          await delay("infinite");
        }),
      ],
    },
  },
};

export const NotFound: StoryObj<typeof meta> = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://api.github.com/orgs/DaleStudy/teams", () =>
          HttpResponse.json([{ name: "leetcode02" }]),
        ),
        http.get(
          "https://api.github.com/orgs/DaleStudy/teams/leetcode02/members",
          () => HttpResponse.json([]),
        ),
      ],
    },
    query: {
      member: "sunjae9",
    },
  },
};

export const ServerError: StoryObj<typeof meta> = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://api.github.com/orgs/DaleStudy/teams", () =>
          HttpResponse.error(),
        ),
        http.get(
          "https://api.github.com/orgs/DaleStudy/teams/leetcode02/members",
          () => HttpResponse.error(),
        ),
      ],
    },
  },
};
