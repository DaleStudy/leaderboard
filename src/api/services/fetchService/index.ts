import { CONFIG } from "../../config";
import { createGithubClient } from "../github";
import { GithubTree } from "../github/types";
import type { Cohort, Member, Submission } from "../memberInfo/types";

export const createFetchService = (config: typeof CONFIG) => {
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

const dropDuplicateMembers = (members: Member[]): Member[] =>
  members.filter(
    (member, index, self) =>
      index === self.findIndex((m) => m.id === member.id),
  );

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
