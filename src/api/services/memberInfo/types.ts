export type Cohort = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type Member = {
  id: string; // lowercase
  name: string;
  cohort: Cohort;
};

export type MemberInfo = Member & {
  totalSubmissions: number;
  progress: number;
  grade: Grade;
  submissions: Submission[];
};

export type Submission = {
  memberId: string;
  problemTitle: string;
  language: string;
};

export type StudyData = {
  total: number;
  data: MemberInfo[];
};

export type StudyInfo = {
  orgName: string;
  repoOwner: string;
  repoName: string;
  branchName: string;
  teamPrefix: string;
  totalProblemCount: number;
  gradeThresholds: Record<Grade, number>;
};

export type Grade = "SEED" | "SPROUT" | "SMALL_TREE" | "BIG_TREE";

export const Grades = {
  SEED: "SEED",
  SPROUT: "SPROUT",
  SMALL_TREE: "SMALL_TREE",
  BIG_TREE: "BIG_TREE",
} as const;
