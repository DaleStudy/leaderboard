import type { Grade } from "../type";

export type StudyConfig = {
  organization: string;
  repository: string;
  branchName: string;
  teamPrefix: string;
  totalProblemCount: number;
  gradeThresholds: [Grade, number][];
};

export type GitHubConfig = {
  baseUrl: string;
  mediaType: string;
  token: string;
};

export type Config = {
  study: StudyConfig;
  gitHub: GitHubConfig;
};
