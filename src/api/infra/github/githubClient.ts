import type { GithubConfig } from "../../config/type";
import type {
  GithubMember,
  GithubTeam,
  GithubTree,
  GithubTreeResponse,
} from "./types";

export const createGithubClient = (config: GithubConfig) => {
  const request = async (url: string, token: string): Promise<unknown> => {
    const response = await fetch(url, {
      headers: {
        Accept: config.mediaType,
        Authorization: `token ${token}`,
      },
    });

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
      ).then((response) => (response as GithubTeam[]).map((team) => team.name)),

    getTeamMembers: async (
      organization: string,
      teamName: string,
    ): Promise<GithubMember[]> =>
      request(
        `${config.baseUrl}/orgs/${organization}/teams/${teamName}/members`,
        config.token,
      ).then((response) => response as GithubMember[]),

    getDirectoryTree: async (
      owner: string,
      repo: string,
      treeSha: string,
      recursive = 1,
    ): Promise<GithubTree[]> =>
      request(
        `${config.baseUrl}/repos/${owner}/${repo}/git/trees/${treeSha}?recursive=${recursive}`,
        config.token,
      ).then((response) => (response as GithubTreeResponse).tree),
  };
};
