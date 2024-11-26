import { useEffect, useMemo, useState } from "react";
import type { Member } from "../api/services/common/types";

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
        const totalCohorts = new Set(members.map((member) => member.cohort))
          .size;

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
        .filter((member) => member.name.includes(filter.name))
        .filter(
          (member) => filter.cohort === null || member.cohort === filter.cohort,
        ),
    [filter.cohort, filter.name, members],
  );

  return {
    members: filteredMembers,
    totalCohorts,
    isLoading,
    error,
    filter,
    setFilter,
  };
};

export default useMembers;
