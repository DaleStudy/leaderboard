import { useEffect, useState } from "react";
import type { Member } from "../api/services/common/types";

type UseMembers = (params: { getMembers: () => Promise<Member[]> }) => {
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

  return {
    members,
    isLoading,
    error,
  };
};

export default useMembers;
