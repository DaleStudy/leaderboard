import type { Config } from "../config/type";
import { type Grade, Grades } from "../type";
import type { Member, MemberInfo, Submission } from "./types";

export const createProcessService = (config: Config) => ({
  analyzeMemberInfo(
    members: Member[],
    submissions: Submission[],
  ): MemberInfo[] {
    const memberMap = initializeMemberMap(members);
    updateSubmissions(memberMap, submissions);
    calculateProgress(memberMap, config.study.totalProblemCount);
    updateGrades(memberMap, config.study.gradeThresholds);

    return Object.values(memberMap);
  },
});

const initializeMemberMap = (members: Member[]): Record<string, MemberInfo> => {
  const memberMap: Record<string, MemberInfo> = {};

  members.forEach((member) => {
    memberMap[member.id] = {
      ...member,
      totalSubmissions: 0,
      submissions: [],
      progress: 0,
      grade: Grades.SEED,
    };
  });

  return memberMap;
};

const updateSubmissions = (
  memberMap: Record<string, MemberInfo>,
  submissions: Submission[],
): void => {
  submissions.forEach((submission) => {
    const member = memberMap[submission.memberId];
    if (!member) return;

    if (isNewProblem(member, submission)) {
      member.totalSubmissions += 1;
    }

    member.submissions.push(submission);
  });
};

const isNewProblem = (member: MemberInfo, submission: Submission): boolean => {
  return !member.submissions.some(
    (s) => s.problemTitle === submission.problemTitle,
  );
};

const calculateProgress = (
  memberMap: Record<string, MemberInfo>,
  totalProblemCount: number,
): void => {
  Object.values(memberMap).forEach((member) => {
    member.progress =
      Math.round((member.totalSubmissions / totalProblemCount) * 1000) / 10;
  });
};

const updateGrades = (
  memberMap: Record<string, MemberInfo>,
  thresholds: [Grade, number][],
): void => {
  Object.values(memberMap).forEach((member) => {
    member.grade = determineGrade(member.totalSubmissions, thresholds);
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
  return grade ? grade[0] : Grades.SEED;
};
