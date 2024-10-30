export const CONFIG = {
  study: {
    orgName: "DaleStudy",
    repoOwner: "DaleStudy",
    repoName: "leetcode-study",
    branchName: "main",
    teamPrefix: "leetcode",
    totalProblemCount: 75,
    gradeThresholds: {
      BIG_TREE: 70,
      SMALL_TREE: 60,
      SPROUT: 50,
      SEED: 0,
    },
  },
  github: {
    token: process.env.GITHUB_TOKEN ?? "",
  },
} as const;
