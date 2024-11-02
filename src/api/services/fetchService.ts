import type { Config } from "../config/type";
import { createGithubClient } from "../infra/github/githubClient";
import type { GithubTree } from "../infra/github/types";
import type { Cohort, Member, Submission } from "./types";

export const createFetchService = (config: Config) => {
  const githubClient = createGithubClient(config.github);

  return {
    fetchMembers: async (): Promise<Member[]> => {
      const teamNames = await githubClient.getTeamNames(
        config.study.organization,
      );

      const members = await Promise.all(
        teamNames
          .filter((name) => name.startsWith(config.study.teamPrefix))
          .map(async (teamName) => {
            const members = await githubClient.getTeamMembers(
              config.study.organization,
              teamName,
            );
            const cohort = parseCohort(teamName, config.study.teamPrefix);

            return members.map(
              (member): Member => ({
                id: member.login.toLocaleLowerCase(),
                name: member.login,
                profileUrl: member.avatar_url,
                cohort,
              }),
            );
          }),
      );

      return dropDuplicateMembers(members.flat());
    },

    fetchSubmissions: async (repoName: string): Promise<Submission[]> => {
      const submissions = await githubClient.getDirectoryTree(
        config.study.organization,
        repoName,
        config.study.branchName,
      );

      return submissions
        .filter(isRelevantTree)
        .map(parseSubmissionTree)
        .filter((submission): submission is Submission => submission !== null);
    },
  };
};

const parseCohort = (teamName: string, prefix: string): Cohort => {
  const cohort = parseInt(teamName.replace(prefix, ""), 10);
  if (!isCohort(cohort)) {
    throw new Error(`Invalid cohort number: ${cohort} from team ${teamName}`);
  }
  return cohort as Cohort;
};

const isCohort = (value: number): value is Cohort => {
  return Number.isInteger(value) && value > 0;
};

const dropDuplicateMembers = (members: Member[]): Member[] => {
  const memberMap = members.reduce((acc, member) => {
    const existingMember = acc.get(member.id);
    if (!existingMember || member.cohort > existingMember.cohort) {
      acc.set(member.id, member);
    }
    return acc;
  }, new Map<string, Member>());

  return Array.from(memberMap.values());
};

const isRelevantTree = (tree: GithubTree): boolean => {
  return tree.type === "blob" && tree.path.includes("/");
};

const parseSubmissionTree = (tree: GithubTree): Submission | null => {
  const regex = /^([^/]+)\/([^.]+)\.([a-zA-Z0-9]+)$/;
  const match = tree.path.toLocaleLowerCase().match(regex);

  if (!match) return null;

  const [, problemTitle, memberId, language] = match;
  return { memberId, problemTitle, language };
};
