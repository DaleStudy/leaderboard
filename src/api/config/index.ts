import type { Grade } from "../services/memberInfo/types";

export const CONFIG = {
  study: {
    organization: "DaleStudy",
    repository: "leetcode-study",
    branchName: "main",
    teamPrefix: "leetcode",
    totalProblemCount: 75,
    gradeThresholds: [
      ["BIG_TREE", 70],
      ["SMALL_TREE", 60],
      ["SPROUT", 50],
      ["SEED", 0],
    ] as [Grade, number][],
  },
  github: {
    baseUrl: "https://api.github.com",
    mediaType: "application/vnd.github+json",
    token: process.env.GITHUB_TOKEN ?? "",
  },
} as const;
