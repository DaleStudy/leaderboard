export enum Grade {
  SEED = "SEED",
  SPROUT = "SPROUT",
  LEAF = "LEAF",
  BRANCH = "BRANCH",
  FRUIT = "FRUIT",
  TREE = "TREE",
}

export type MemberIdentity = {
  id: string; // lowercase
  name: string;
  cohort: number;
  cohorts: Set<number>;
  profileUrl?: string;
};

export type Submission = {
  memberId: string;
  problemTitle: string;
  language: string;
};

export type Difficulty = "Easy" | "Med" | "Hard";

export type Problem = {
  id: number;
  title: string;
  difficulty: Difficulty;
};

export interface Member {
  id: string;
  name: string;
  /** 현재 기수 (1기, 2기, 3기 ...) */
  cohort: number;
  /** 참여한 전체 기수 목록 */
  cohorts: Set<number>;
  /** Profile Image URL */
  profileUrl?: string;
  /** Unit: % */
  progress: number;
  grade: Grade;
  solvedProblems: Problem[];
}
