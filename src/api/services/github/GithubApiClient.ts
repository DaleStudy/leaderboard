import { IFetchClient } from "../../utils/interfaces";
import { IGithubApiClient } from "./interfaces";
import {
  GithubMember,
  GithubTeam,
  GithubTree,
  GithubTreeResponse,
} from "./types";
import { handleError } from "../../common";

export class GithubApiClient implements IGithubApiClient {
  private static readonly BASE_URL = "https://api.github.com";
  private static readonly MEDIA_TYPE = "application/vnd.github+json";

  constructor(
    private readonly fetchClient: IFetchClient,
    private readonly githubToken: string,
  ) {
    this.initializeClient();
  }

  async getTeams(orgName: string): Promise<GithubTeam[]> {
    return this.executeRequest<GithubTeam[]>(
      this.buildUrl`/orgs/${orgName}/teams`,
      `Failed to fetch teams for organization: ${orgName}`,
    );
  }

  async getTeamMembers(
    orgName: string,
    teamName: string,
  ): Promise<GithubMember[]> {
    return this.executeRequest<GithubMember[]>(
      this.buildUrl`/orgs/${orgName}/teams/${teamName}/members`,
      `Failed to fetch members for team: ${teamName} in organization: ${orgName}`,
    );
  }

  async getDirectoryTree(
    owner: string,
    repo: string,
    treeSha: string,
    recursive = 1,
  ): Promise<GithubTree[]> {
    const response = await this.executeRequest<GithubTreeResponse>(
      this
        .buildUrl`/repos/${owner}/${repo}/git/trees/${treeSha}?recursive=${recursive}`,
      `Failed to fetch directory tree for repository: ${repo} owned by: ${owner}`,
    );

    return response.tree;
  }

  private initializeClient(): void {
    if (!this.githubToken) {
      throw new Error("GitHub token is required but not provided");
    }

    this.fetchClient.setBaseUrl(GithubApiClient.BASE_URL).setBaseHeaders([
      ["Accept", GithubApiClient.MEDIA_TYPE],
      ["Authorization", `Bearer ${this.githubToken}`],
    ]);
  }

  private async executeRequest<T>(
    url: string,
    errorContext: string,
  ): Promise<T> {
    try {
      return await this.fetchClient.get<T>(url);
    } catch (error) {
      throw handleError(errorContext, error);
    }
  }

  private buildUrl(
    strings: TemplateStringsArray,
    ...values: (string | number)[]
  ): string {
    return strings.reduce((result, str, i) => {
      const value = values[i] ?? "";
      return result + str + encodeURIComponent(value.toString());
    }, "");
  }
}
