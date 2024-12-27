import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor } from "@storybook/test";
import { delay, http, HttpResponse } from "msw";
import Leaderboard from "./Leaderboard";

const meta = {
  component: Leaderboard,
  parameters: {
    a11y: {
      disable: true,
    },
    msw: {
      handlers: [
        http.get("https://api.github.com/orgs/DaleStudy/teams", () =>
          HttpResponse.json([{ name: "leetcode01" }, { name: "leetcode02" }]),
        ),
        http.get(
          "https://api.github.com/orgs/DaleStudy/teams/leetcode01/members",
          () =>
            HttpResponse.json([
              {
                login: "sounmind",
                avatar_url:
                  "https://avatars.githubusercontent.com/u/37020415?v=4",
              },
              {
                login: "yolophg",
                avatar_url:
                  "https://avatars.githubusercontent.com/u/38199103?v=4",
              },
              {
                login: "SamTheKorean",
                avatar_url:
                  "https://avatars.githubusercontent.com/u/104721736?v=4",
              },
            ]),
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
              {
                login: "HC-kang",
                avatar_url:
                  "https://avatars.githubusercontent.com/u/81678439?v=4",
              },
            ]),
        ),
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
        http.get("https://api.github.com/orgs/DaleStudy/teams", async () => {
          await delay("infinite");
        }),
      ],
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

export const ByCohort: StoryObj<typeof meta> = {
  play: async ({ canvas, step }) => {
    const combobox = await canvas.findByRole("combobox");
    expect(
      await canvas.findByRole("option", { name: "1기" }, { timeout: 10_000 }),
    ).toBeInTheDocument();

    await step("1기 선택", async () => {
      await userEvent.selectOptions(combobox, "1");
      expect(await canvas.findAllByRole("article")).toHaveLength(3);
    });

    await step("2기 선택", async () => {
      await userEvent.selectOptions(combobox, "2");
      expect(await canvas.findAllByRole("article")).toHaveLength(2);
    });
  },
};

export const ByMember: StoryObj<typeof meta> = {
  play: async ({ canvas, step }) => {
    const searchbox = await canvas.findByRole("searchbox");

    await step("s 입력", async () => {
      await userEvent.type(searchbox, "s");
      await waitFor(
        () => {
          expect(canvas.getAllByRole("article")).toHaveLength(3);
        },
        { timeout: 15_000 },
      );
    });

    await step("un 입력", async () => {
      await userEvent.type(searchbox, "un");
      await waitFor(
        () => {
          expect(canvas.getAllByRole("article")).toHaveLength(1);
        },
        { timeout: 15_000 },
      );
    });
  },
};
