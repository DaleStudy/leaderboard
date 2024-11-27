import type { Grade } from "../services/common/types";
import type { Config } from "./types";

export const CONFIG: Config = {
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
  gitHubToken: import.meta.env.VITE_GITHUB_API_TOKEN,
} as const;
