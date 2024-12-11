import type {
  GitHubMember,
  GitHubTeam,
  GitHubTree,
  GitHubTreeResponse,
} from "./types";

export function createGitHubClient(token: string) {
  const request = async (url: string): Promise<unknown> => {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
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
      request(`https://api.github.com/orgs/${organization}/teams`).then(
        (response) => (response as GitHubTeam[]).map((team) => team.name),
      ),

    getTeamMembers: async (
      organization: string,
      teamName: string,
    ): Promise<GitHubMember[]> =>
      request(
        `https://api.github.com/orgs/${organization}/teams/${teamName}/members?per_page=100`,
      ).then((response) => response as GitHubMember[]),

    getDirectoryTree: async (
      owner: string,
      repo: string,
      treeSha: string,
      recursive = 1,
    ): Promise<GitHubTree[]> =>
      request(
        `https://api.github.com/repos/${owner}/${repo}/git/trees/${treeSha}?recursive=${recursive}`,
      ).then((response) => (response as GitHubTreeResponse).tree),
  };
}
