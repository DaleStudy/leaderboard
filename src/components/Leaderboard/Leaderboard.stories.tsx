import type { Meta, StoryObj } from "@storybook/react";
import { http, HttpResponse } from "msw";
import Leaderboard from "./Leaderboard";

const meta = {
  component: Leaderboard,
} satisfies Meta<typeof Leaderboard>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  parameters: {
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
                id: 81678439,
                node_id: "MDQ6VXNlcjgxNjc4NDM5",
                avatar_url:
                  "https://avatars.githubusercontent.com/u/81678439?v=4",
                gravatar_id: "",
                url: "https://api.github.com/users/HC-kang",
                html_url: "https://github.com/HC-kang",
                followers_url: "https://api.github.com/users/HC-kang/followers",
                following_url:
                  "https://api.github.com/users/HC-kang/following{/other_user}",
                gists_url:
                  "https://api.github.com/users/HC-kang/gists{/gist_id}",
                starred_url:
                  "https://api.github.com/users/HC-kang/starred{/owner}{/repo}",
                subscriptions_url:
                  "https://api.github.com/users/HC-kang/subscriptions",
                organizations_url: "https://api.github.com/users/HC-kang/orgs",
                repos_url: "https://api.github.com/users/HC-kang/repos",
                events_url:
                  "https://api.github.com/users/HC-kang/events{/privacy}",
                received_events_url:
                  "https://api.github.com/users/HC-kang/received_events",
                type: "User",
                user_view_type: "public",
                site_admin: false,
              },
            ]),
        ),
      ],
    },
  },
};
