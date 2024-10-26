// Fetch API
export type HeaderTuple = [string, string];

// Github API
export type GithubTeam = {
  name: string;
  id: number;
  node_id: string;
  slug: string;
  description: string;
  privacy: string;
  notification_setting: string;
  url: string;
  html_url: string;
  members_url: string;
  repositories_url: string;
  permission: string;
  parent: null;
};

export type GithubMember = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
};

export type GithubTreeResponse = {
  sha: string;
  url: string;
  tree: GithubTree[];
};

export type GithubTree = {
  path: string;
  mode: string;
  type: string;
  size: number;
  sha: string;
  url: string;
};

// Study Data
export type Cohort = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type Member = {
  id: string; // lowercase
  name: string;
  cohort: Cohort;
};

export type MemberInfo = Member & {
  totalSubmissions: number;
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

export type GithubInfo = {
  orgName: string;
  repoOwner: string;
  repoName: string;
  branchName: string;
  teamPrefix: string;
};
