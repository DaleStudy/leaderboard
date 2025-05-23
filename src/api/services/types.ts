export type Grade = "SEED" | "SPROUT" | "LEAF" | "BRANCH" | "FRUIT" | "TREE";

export type MemberIdentity = {
  id: string; // lowercase
  name: string;
  cohorts: number[];
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
  /** 참여한 전체 기수 목록 */
  cohorts: number[];
  /** Profile Image URL */
  profileUrl?: string;
  /** Unit: % */
  progress: number;
  grade: Grade;
  solvedProblems: Problem[];
}
