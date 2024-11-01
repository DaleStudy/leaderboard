import { BASE_URL, MEDIA_TYPE } from "./const";
import type {
  GithubMember,
  GithubTeam,
  GithubTree,
  GithubTreeResponse,
} from "./types";

export const createGithubClient = (token: string) => {
  const request = async (url: string, token: string): Promise<unknown> => {
    const response = await fetch(url, {
      headers: {
        Accept: MEDIA_TYPE,
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
      request(`${BASE_URL}/orgs/${organization}/teams`, token).then(
        (response) => (response as GithubTeam[]).map((team) => team.name),
      ),

    getTeamMembers: async (
      organization: string,
      teamName: string,
    ): Promise<GithubMember[]> =>
      request(
        `${BASE_URL}/orgs/${organization}/teams/${teamName}/members`,
        token,
      ).then((response) => response as GithubMember[]),

    getDirectoryTree: async (
      owner: string,
      repo: string,
      treeSha: string,
      recursive = 1,
    ): Promise<GithubTree[]> =>
      request(
        `${BASE_URL}/repos/${owner}/${repo}/git/trees/${treeSha}?recursive=${recursive}`,
        token,
      ).then((response) => (response as GithubTreeResponse).tree),
  };
};
