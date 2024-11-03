import { useEffect, useState } from "react";

import type { MemberInfo } from "../api";

export interface Member {
  id: string;
  name: string;
  /** 기수 (1기, 2기, 3기 ...) */
  cohort: number;
  /** Profile Image URL */
  profileUrl?: string;
  /** Unit: % */
  progress: number;
  grade: "SEED" | "SPROUT" | "SMALL_TREE" | "BIG_TREE";
  /** Example: ["best-time-to-buy-and-sell-stock", "3sum", "climbing-stairs", ...] */
  solvedProblems: string[];
}

type UseMembers = (params: { getMembers: () => Promise<MemberInfo[]> }) => {
  members: Member[] | null;
  isLoading: boolean;
  error: unknown | null;
};

const useMembers: UseMembers = function ({ getMembers }) {
  const [members, setMembers] = useState<Member[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    async function fetchMemberInfo() {
      setIsLoading(true);

      try {
        const members = await getMembers();

        setMembers(mapToMembers(members));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMemberInfo();
  }, [getMembers]);

  return {
    members,
    isLoading,
    error,
  };
};

export default useMembers;

function mapToMembers(members: MemberInfo[]): Member[] {
  return members.map((member) => ({
    id: member.id,
    name: member.name,
    cohort: member.cohort,
    profileUrl: member.profileUrl,
    progress: member.progress,
    grade: member.grade,
    solvedProblems: member.submissions.map(
      (submission) => submission.problemTitle,
    ),
  }));
}
