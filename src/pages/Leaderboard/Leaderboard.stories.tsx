import type { Meta, StoryObj } from "@storybook/react";
import { userEvent } from "@storybook/test";
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

export const ByCohort: StoryObj<typeof meta> = {
  // play: async ({ canvas, step }) => {
  //   const combobox = await canvas.findByRole("combobox");
  //   await step("1기 선택", async () => {
  //     expect(
  //       await canvas.findByRole("option", { name: "1기" }, { timeout: 10_000 }),
  //     ).toBeInTheDocument();
  //     await userEvent.selectOptions(combobox, "1");
  //     expect(await canvas.findAllByRole("article")).toHaveLength(3);
  //   });
  //   await step("2기 선택", async () => {
  //     expect(
  //       await canvas.findByRole("option", { name: "2기" }, { timeout: 10_000 }),
  //     ).toBeInTheDocument();
  //     await userEvent.selectOptions(combobox, "2");
  //     expect(await canvas.findAllByRole("article")).toHaveLength(2);
  //   });
  // },
};

export const ByMember: StoryObj<typeof meta> = {
  play: async ({ canvas, step }) => {
    const searchbox = await canvas.findByRole("searchbox");

    await step("s 입력", async () => {
      await userEvent.type(searchbox, "s");
      // await waitFor(
      //   () => {
      //     expect(canvas.getAllByRole("article")).toHaveLength(3);
      //   },
      //   { timeout: 12_000 },
      // );
    });

    await step("un 입력", async () => {
      await userEvent.type(searchbox, "un");
      // await waitFor(
      //   () => {
      //     expect(canvas.getAllByRole("article")).toHaveLength(1);
      //   },
      //   { timeout: 12_000 },
      // );
    });
  },
};
