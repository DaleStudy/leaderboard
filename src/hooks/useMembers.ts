import { useEffect, useMemo, useState } from "react";
import type { Member } from "../api/services/types";

type UseMembers = (params: { getMembers: () => Promise<Member[]> }) => {
  members: Member[];
  totalCohorts: number;
  isLoading: boolean;
  error: unknown | null;
  filter: { name: string; cohort: number | null };
  setFilter: (filter: Filter) => void;
};

export type Filter = {
  name: string;
  cohort: number | null;
};

const useMembers: UseMembers = function ({ getMembers }) {
  const [members, setMembers] = useState<Member[]>([]);
  const [totalCohorts, setTotalCohorts] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | null>(null);
  const [filter, setFilter] = useState<Filter>({
    name: "",
    cohort: null,
  });

  useEffect(() => {
    async function fetchMemberInfo() {
      setIsLoading(true);

      try {
        const members = await getMembers();
        const totalCohorts = Math.max(
          ...members.map((member) => Math.max(...member.cohorts)),
        );

        setTotalCohorts(totalCohorts);
        setMembers(members);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMemberInfo();
  }, [getMembers]);

  const filteredMembers = useMemo(
    () =>
      members
        .filter((member) =>
          member.name.toLowerCase().includes(filter.name.toLowerCase()),
        )
        .filter(
          (member) =>
            filter.cohort === null || member.cohorts.includes(filter.cohort),
        ),
    [filter.cohort, filter.name, members],
  );
  const sortedMembers = useMemo(() => {
    return filteredMembers.sort((a, b) => b.progress - a.progress);
  }, [filteredMembers]);

  return {
    members: sortedMembers,
    totalCohorts,
    isLoading,
    error,
    filter,
    setFilter,
  };
};

export default useMembers;
