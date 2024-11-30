import type { GitHubConfig } from "../../config/types";
import type {
  GitHubMember,
  GitHubTeam,
  GitHubTree,
  GitHubTreeResponse,
} from "./types";

export function createGitHubClient(config: GitHubConfig) {
  const request = async (url: string, token?: string): Promise<unknown> => {
    const headers: Record<string, string> = {
      Accept: config.mediaType,
    };

    if (token) {
      headers.Authorization = `token ${token}`;
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch url: ${url}, status: ${response.status}, statusText: ${response.statusText}`,
      );
    }

    return response.json();
  };

  return {
    getTeamNames: async (organization: string): Promise<string[]> =>
      request(
        `${config.baseUrl}/orgs/${organization}/teams`,
        config.token,
      ).then((response) => (response as GitHubTeam[]).map((team) => team.name)),

    getTeamMembers: async (
      organization: string,
      teamName: string,
    ): Promise<GitHubMember[]> =>
      request(
        `${config.baseUrl}/orgs/${organization}/teams/${teamName}/members`,
        config.token,
      ).then((response) => response as GitHubMember[]),

    getDirectoryTree: async (
      owner: string,
      repo: string,
      treeSha: string,
      recursive = 1,
    ): Promise<GitHubTree[]> =>
      request(
        `${config.baseUrl}/repos/${owner}/${repo}/git/trees/${treeSha}?recursive=${recursive}`,
      ).then((response) => (response as GitHubTreeResponse).tree),
  };
}
