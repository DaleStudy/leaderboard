import type { Grade } from "../services/types";

export type Config = {
  totalProblemCount: number;
  gradeThresholds: [Grade, number][];
  gitHubToken: string;
};
