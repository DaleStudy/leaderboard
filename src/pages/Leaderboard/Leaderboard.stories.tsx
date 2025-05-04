import type { Meta, StoryObj } from "@storybook/react";
import { delay, graphql, HttpResponse } from "msw";
import Leaderboard from "./Leaderboard";

const meta = {
  component: Leaderboard,
  parameters: {
    msw: {
      handlers: [
        graphql.query("GetTeams", () =>
          HttpResponse.json({
            data: { teams: [{ name: "leetcode01" }, { name: "leetcode02" }] },
          }),
        ),
        graphql.query("GetTeamMembers", ({ variables }) => {
          const { teamName } = variables;
          if (teamName == "leetcode01") {
            return HttpResponse.json({
              data: {
                members: [
                  {
                    login: "sounmind",
                    avatarUrl:
                      "https://avatars.githubusercontent.com/u/37020415?v=4",
                  },
                  {
                    login: "yolophg",
                    avatarUrl:
                      "https://avatars.githubusercontent.com/u/38199103?v=4",
                  },
                  {
                    login: "SamTheKorean",
                    avatarUrl:
                      "https://avatars.githubusercontent.com/u/104721736?v=4",
                  },
                ],
              },
            });
          } else {
            return HttpResponse.json({
              data: {
                members: [
                  {
                    login: "Sunjae95",
                    avatarUrl:
                      "https://avatars.githubusercontent.com/u/63578094?v=4",
                  },
                  {
                    login: "HC-kang",
                    avatarUrl:
                      "https://avatars.githubusercontent.com/u/81678439?v=4",
                  },
                ],
              },
            });
          }
        }),
      ],
    },
  },
} satisfies Meta<typeof Leaderboard>;

export default meta;

export const Default: StoryObj<typeof meta> = {};

export const Loading: StoryObj<typeof meta> = {
  parameters: {
    msw: {
      handlers: [
        graphql.query("GetTeams", async () => await delay("infinite")),
      ],
    },
  },
};

export const ServerError: StoryObj<typeof meta> = {
  parameters: {
    msw: {
      handlers: [
        graphql.query("GetTeams", () =>
          HttpResponse.json({
            errors: [
              {
                message: `Cannot fetch teams"`,
              },
            ],
          }),
        ),
        graphql.query("GetTeamMembers", () =>
          HttpResponse.json({
            errors: [
              {
                message: `Cannot fetch team members"`,
              },
            ],
          }),
        ),
      ],
    },
  },
};
