import type { Grade } from "../services/common/types";

export type StudyConfig = {
  organization: string;
  repository: string;
  branchName: string;
  teamPrefix: string;
  totalProblemCount: number;
  gradeThresholds: [Grade, number][];
};

export type Config = {
  study: StudyConfig;
  gitHubToken: string;
};
