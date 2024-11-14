import type { Config } from "../../config/types";
import {
  Grade,
  type Member,
  type MemberIdentity,
  type Submission,
} from "../common/types";

export function createProcessService(config: Config) {
  return {
    getMembers(members: MemberIdentity[], submissions: Submission[]): Member[] {
      const memberMap = initializeMemberMap(members);

      updateSubmissions(memberMap, submissions);
      calculateProgress(memberMap, config.study.totalProblemCount);
      updateGrades(memberMap, config.study.gradeThresholds);

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
      grade: Grade.SEED,
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
    if (!member) return;

    member.solvedProblems.push(submission.problemTitle);
  });

  submissions.forEach((submission) => {
    const member = memberMap[submission.memberId];
    if (!member) return;

    member.solvedProblems = Array.from(new Set(member.solvedProblems));
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

  return grade ? grade[0] : Grade.SEED;
};
