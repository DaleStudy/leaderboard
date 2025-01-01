import { problemMap } from "../../constants/problems";
import type { Config } from "../../config/types";
import type { Grade, Member, MemberIdentity, Submission } from "../types";

export function createProcessService(config: Config) {
  return {
    getMembers(
      memberIdentities: MemberIdentity[],
      submissions: Submission[],
    ): Member[] {
      const memberMap = initializeMemberMap(memberIdentities);

      updateSubmissions(memberMap, submissions);
      dropMembersWithoutSubmissions(memberMap);
      calculateProgress(memberMap, config.totalProblemCount);
      updateGrades(memberMap, config.gradeThresholds);

      return Object.values(memberMap);
    },
  };
}

const initializeMemberMap = (
  members: MemberIdentity[],
): Record<string, Member> => {
  const memberMap: Record<string, Member> = {};

  members.forEach((member) => {
    memberMap[member.id] = {
      ...member,
      solvedProblems: [],
      progress: 0,
      grade: "SEED",
    };
  });

  return memberMap;
};

const updateSubmissions = (
  memberMap: Record<string, Member>,
  submissions: Submission[],
): void => {
  submissions.forEach((submission) => {
    const member = memberMap[submission.memberId];

    if (!member) {
      return;
    }

    const alreadySolved = member.solvedProblems.find(
      (problem) => problem.title === submission.problemTitle,
    );

    if (alreadySolved) {
      return;
    }

    member.solvedProblems.push(problemMap[submission.problemTitle]);
  });
};

const dropMembersWithoutSubmissions = (
  memberMap: Record<string, Member>,
): void => {
  Object.keys(memberMap).forEach((memberId) => {
    if (memberMap[memberId].solvedProblems.length === 0) {
      delete memberMap[memberId];
    }
  });
};

const calculateProgress = (
  memberMap: Record<string, Member>,
  totalProblemCount: number,
): void => {
  Object.values(memberMap).forEach((member) => {
    member.progress =
      Math.round((member.solvedProblems.length / totalProblemCount) * 1000) /
      10;
  });
};

const updateGrades = (
  memberMap: Record<string, Member>,
  thresholds: [Grade, number][],
): void => {
  Object.values(memberMap).forEach((member) => {
    member.grade = determineGrade(member.solvedProblems.length, thresholds);
  });
};

const determineGrade = (
  totalSubmissions: number,
  thresholds: [Grade, number][],
): Grade => {
  thresholds.sort((a, b) => b[1] - a[1]);
  const grade = thresholds.find(
    ([, threshold]) => totalSubmissions >= threshold,
  );

  return grade ? grade[0] : "SEED";
};
