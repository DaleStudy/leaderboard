import type { Meta, StoryObj } from "@storybook/react";
import { delay, graphql, HttpResponse } from "msw";

import Certificate from "./Certificate";

const meta: Meta<typeof Certificate> = {
  component: Certificate,
  parameters: {
    query: {
      member: "sunjae95",
    },
    msw: {
      handlers: [
        graphql.query("GetTeams", () =>
          HttpResponse.json({ data: { teams: [{ name: "leetcode02" }] } }),
        ),
        graphql.query("GetTeamMembers", () =>
          HttpResponse.json({
            data: {
              members: [
                {
                  login: "Sunjae95",
                  avatarUrl:
                    "https://avatars.githubusercontent.com/u/63578094?v=4",
                },
              ],
            },
          }),
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
        graphql.query("GetTeams", async () => await delay("infinite")),
      ],
    },
  },
};

export const NotFound: StoryObj<typeof meta> = {
  parameters: {
    msw: {
      handlers: [
        graphql.query("GetTeams", () =>
          HttpResponse.json({ data: { teams: [{ name: "leetcode02" }] } }),
        ),
        graphql.query("GetTeamMembers", () =>
          HttpResponse.json({
            data: {
              members: [],
            },
          }),
        ),
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
