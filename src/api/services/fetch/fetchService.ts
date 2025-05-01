import { createGitHubClient } from "../../infra/gitHub/gitHubClient";
import type { GitHubTree } from "../../infra/gitHub/types";
import type { MemberIdentity, Submission } from "../types";

export function createFetchService() {
  const gitHubClient = createGitHubClient();

  return {
    fetchMembers: async (): Promise<MemberIdentity[]> => {
      const teamPrefix = "leetcode";
      const teamNames = await gitHubClient.getTeamNames();

      const members = await Promise.all(
        teamNames
          .filter((name) => name.startsWith(teamPrefix))
          .map(async (teamName) => {
            const members = await gitHubClient.getTeamMembers(teamName);

            // 기수(코호트)는 명확하게 숫자로 구성되어 있다고 가정한다.
            const cohort = parseInt(teamName.replace(teamPrefix, ""), 10);

            return members.map(
              (member): MemberIdentity => ({
                id: member.login.toLocaleLowerCase(),
                name: member.login,
                profileUrl: member.avatarUrl,
                cohorts: [cohort],
              }),
            );
          }),
      );

      return dropDuplicateMembers(members.flat());
    },

    fetchSubmissions: async (): Promise<Submission[]> => {
      const submissions = await gitHubClient.getDirectoryTree();

      return submissions
        .filter((tree) => tree.type === "blob" && tree.path.includes("/")) // 제출된 풀이(디렉토리 아래에 있는 파일)만 필터링
        .map(parseSubmissionTree)
        .filter((submission): submission is Submission => submission !== null);
    },
  };
}

const dropDuplicateMembers = (members: MemberIdentity[]): MemberIdentity[] => {
  const memberMap = members.reduce((acc, member) => {
    const existingMember = acc.get(member.id);
    if (existingMember) {
      existingMember.cohorts = [
        ...new Set([...existingMember.cohorts, ...member.cohorts]),
      ];
    } else {
      acc.set(member.id, member);
    }
    return acc;
  }, new Map<string, MemberIdentity>());

  return Array.from(memberMap.values());
};

const parseSubmissionTree = (tree: GitHubTree): Submission | null => {
  const regex = /^([^/]+)\/([^.]+)\.([a-zA-Z0-9]+)$/;
  const match = tree.path.toLocaleLowerCase().match(regex);

  if (!match) return null;

  const [, problemTitle, memberId, language] = match;
  return { memberId, problemTitle, language };
};
