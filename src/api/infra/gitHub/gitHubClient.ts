import type { GitHubMember, GitHubTeam, GitHubTree } from "./types";

export function createGitHubClient(token: string) {
  const graphqlRequest = async (query: string) => {
    const response = await fetch(`https://my-graph-qnyr67.fly.dev/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    return (await response.json()).data;
  };

  return {
    getTeamNames: async (organization: string): Promise<string[]> => {
      const query = `{
        teams {
          name
        }
      }`;
      const teams = (await graphqlRequest(query)).teams;
      return (teams as GitHubTeam[]).map((team) => team.name);
    },

    getTeamMembers: async (
      organization: string,
      teamName: string,
    ): Promise<GitHubMember[]> => {
      const query = `{
        team(name: "${teamName}") {
          members {
            id
            login
          }
        }
      }`;
      const members = (await graphqlRequest(query)).team.members;
      return members as GitHubMember[];
    },

    getDirectoryTree: async (
      owner: string,
      repo: string,
      treeSha: string,
      recursive = 1,
    ): Promise<GitHubTree[]> => {
      const query = `{
        gitTrees {
          path
          type
        }
      }`;
      const trees = (await graphqlRequest(query)).gitTrees;
      return trees as GitHubTree[];
    },
  };
}
