export type Cohort = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type CohortInfo = {
  cohort: Cohort;
  totalMembers: number;
  members: Member[];
};

export type Member = {
  id: string;
  name: string;
};

export type RepositoryTree = {
  path: string;
  mode: string;
  type: string;
  sha: string;
  url: string;
  size: number;
};

export type SubmissionPath = string;

export type Submission = {
  memberId: string;
  problemTitle: string;
  language: string;
};

export type SubmissionOfMember = {
  memberId: string;
  totalSubmissions: number;
  submissions: Submission[];
};
