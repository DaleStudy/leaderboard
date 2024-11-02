import type { Grade } from "../type";

export type Cohort = number;

export type Member = {
  id: string; // lowercase
  name: string;
  cohort: Cohort;
  profileUrl?: string;
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
