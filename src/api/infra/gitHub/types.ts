export type GitHubTeam = {
  name: string;
};

export type GitHubMember = {
  login: string;
  id: number;
  avatarUrl: string;
};

export type GitHubTree = {
  path: string;
  type: string;
};
