import type { Grade } from "../services/types";

export type Config = {
  branchName: string;
  teamPrefix: string;
  totalProblemCount: number;
  gradeThresholds: [Grade, number][];
  gitHubToken: string;
};
