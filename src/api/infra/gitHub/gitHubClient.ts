import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://dalestudy.fly.dev/",
  cache: new InMemoryCache(),
});

export interface GitHubTeam {
  name: string;
}

export async function getTeams() {
  const { data } = await client.query<{ teams: GitHubTeam[] }>({
    query: gql`
      query GetTeams {
        teams {
          name
        }
      }
    `,
  });
  return data.teams;
}

export interface GitHubMember {
  login: string;
  id: number;
  avatarUrl: string;
}

export async function getTeamMembers(teamName: string) {
  const { data } = await client.query<{ members: GitHubMember[] }>({
    query: gql`
      query GetTeamMembers($teamName: String!) {
        members(teamName: $teamName) {
          id
          login
          avatarUrl
        }
      }
    `,
    variables: { teamName },
  });
  return data.members;
}

export type GitHubTree = {
  path: string;
  type: string;
};

export async function getGitTrees() {
  const { data } = await client.query<{ gitTrees: GitHubTree[] }>({
    query: gql`
      query GetGitTrees {
        gitTrees {
          path
          type
        }
      }
    `,
  });
  return data.gitTrees;
}
