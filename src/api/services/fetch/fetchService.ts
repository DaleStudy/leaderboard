import type { Config } from "../../config/type";
import { createGitHubClient } from "../../infra/gitHub/gitHubClient";
import type { GitHubTree } from "../../infra/gitHub/types";
import type { Cohort, Member, Submission } from "../common/types";

export function createFetchService(config: Config) {
  const gitHubClient = createGitHubClient(config.gitHub);

  return {
    fetchMembers: async (): Promise<Member[]> => {
      const teamNames = await gitHubClient.getTeamNames(
        config.study.organization,
      );

      const members = await Promise.all(
        teamNames
          .filter((name) => name.startsWith(config.study.teamPrefix))
          .map(async (teamName) => {
            const members = await gitHubClient.getTeamMembers(
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
      const submissions = await gitHubClient.getDirectoryTree(
        config.study.organization,
        repoName,
        config.study.branchName,
      );

      return submissions
        .filter((tree) => tree.type === "blob" && tree.path.includes("/")) // 제출된 풀이(디렉토리 아래에 있는 파일)만 필터링
        .map(parseSubmissionTree)
        .filter((submission): submission is Submission => submission !== null);
    },
  };
}

const parseCohort = (teamName: string, prefix: string): Cohort => {
  // 기수(코호트)는 명확하게 숫자로 구성되어 있다고 가정한다.
  return parseInt(teamName.replace(prefix, ""), 10);
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

const parseSubmissionTree = (tree: GitHubTree): Submission | null => {
  const regex = /^([^/]+)\/([^.]+)\.([a-zA-Z0-9]+)$/;
  const match = tree.path.toLocaleLowerCase().match(regex);

  if (!match) return null;

  const [, problemTitle, memberId, language] = match;
  return { memberId, problemTitle, language };
};
