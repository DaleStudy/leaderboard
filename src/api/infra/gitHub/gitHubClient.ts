import type { GitHubMember, GitHubTeam, GitHubTree } from "./types";

export function createGitHubClient() {
  const graphqlRequest = async (query: string) => {
    const response = await fetch(`https://my-graph-qnyr67.fly.dev/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    return (await response.json()).data;
  };

  return {
    getTeamNames: async (): Promise<string[]> => {
      const query = `{
        teams {
          name
        }
      }`;
      const teams = (await graphqlRequest(query)).teams;
      return (teams as GitHubTeam[]).map((team) => team.name);
    },

    getTeamMembers: async (teamName: string): Promise<GitHubMember[]> => {
      const query = `{
        members(teamName: "${teamName}") {
          id
          login
          avatarUrl
        }
      }`;
      const members = (await graphqlRequest(query)).members;
      return members as GitHubMember[];
    },

    getDirectoryTree: async (): Promise<GitHubTree[]> => {
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
