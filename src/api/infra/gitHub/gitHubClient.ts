import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://dalestudy.fly.dev/",
  cache: new InMemoryCache(),
});

export interface GitHubTeam {
  name: string;
}

export async function getTeams() {
  const query = gql`
    query GetTeams {
      teams {
        name
      }
    }
  `;
  const { data } = await client.query<{ teams: GitHubTeam[] }>({
    query,
  });
  return data.teams;
}

export interface GitHubMember {
  login: string;
  avatarUrl: string;
}

export async function getTeamMembers(teamName: string) {
  const query = gql`
    query GetTeamMembers($teamName: String!) {
      members(teamName: $teamName) {
        login
        avatarUrl
      }
    }
  `;
  const { data } = await client.query<{ members: GitHubMember[] }>({
    query,
    variables: { teamName },
  });
  return data.members;
}

export type GitHubTree = {
  path: string;
  type: string;
};

export async function getGitTrees() {
  const query = gql`
    query GetGitTrees {
      gitTrees {
        path
        type
      }
    }
  `;
  const { data } = await client.query<{ gitTrees: GitHubTree[] }>({
    query,
  });
  return data.gitTrees;
}
