export const CONFIG = {
  study: {
    orgName: "DaleStudy",
    repoOwner: "DaleStudy",
    repoName: "leetcode-study",
    branchName: "main",
    teamPrefix: "leetcode",
  },
  github: {
    token: process.env.GITHUB_TOKEN ?? "",
  },
} as const;
