export type Cohort = number;

export enum Grade {
  SEED = "SEED",
  SPROUT = "SPROUT",
  SMALL_TREE = "SMALL_TREE",
  BIG_TREE = "BIG_TREE",
}

export type MemberIdentity = {
  id: string; // lowercase
  name: string;
  cohort: Cohort;
  profileUrl?: string;
};

export type Submission = {
  memberId: string;
  problemTitle: string;
  language: string;
};

export interface Member {
  id: string;
  name: string;
  /** 기수 (1기, 2기, 3기 ...) */
  cohort: number;
  /** Profile Image URL */
  profileUrl?: string;
  /** Unit: % */
  progress: number;
  grade: Grade;
  /** Example: ["best-time-to-buy-and-sell-stock", "3sum", "climbing-stairs", ...] */
  solvedProblems: string[];
}
