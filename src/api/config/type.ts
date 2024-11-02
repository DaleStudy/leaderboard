import { Grade } from "../type";

export type StudyConfig = {
  organization: string;
  repository: string;
  branchName: string;
  teamPrefix: string;
  totalProblemCount: number;
  gradeThresholds: [Grade, number][];
};

export type GithubConfig = {
  baseUrl: string;
  mediaType: string;
  token: string;
};

export type Config = {
  study: StudyConfig;
  github: GithubConfig;
};
