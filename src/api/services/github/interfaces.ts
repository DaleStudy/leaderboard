import { GithubTeam, GithubMember, GithubTree } from "../../types";

export interface IGithubApiClient {
  getTeams(orgName: string): Promise<GithubTeam[]>;
  getTeamMembers(orgName: string, teamName: string): Promise<GithubMember[]>;
  getDirectoryTree(
    owner: string,
    repo: string,
    treeSha: string,
    recursive?: number,
  ): Promise<GithubTree[]>;
}
