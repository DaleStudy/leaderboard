import type { Config } from "../config/type";
import type { MemberInfo } from "./types";
import type { Grade } from "../type";
import { createFetchService } from "./fetchService";
import { createProcessService } from "./processService";

type LeaderBoardStore = {
  data: MemberInfo[];
};

const store: LeaderBoardStore = {
  data: [],
};

export const createStoreService = async (config: Config) => {
  const fetchService = createFetchService(config);
  const processService = createProcessService(config);

  const fetchAndProcessData = async (): Promise<MemberInfo[]> => {
    const [members, submissions] = await Promise.all([
      fetchService.fetchMembers(),
      fetchService.fetchSubmissions(config.study.repository),
    ]);

    store.data = processService.analyzeMemberInfo(members, submissions);

    return store.data;
  };

  const getData = async () => {
    if (!store.data.length) {
      return fetchAndProcessData();
    }
    return store.data;
  };

  return {
    getData,

    getMemberById: async (id: string): Promise<MemberInfo[]> => {
      const data = await getData();
      if (!data) throw new Error("Data not found");
      return data.filter((member) => member.id.includes(id.toLowerCase()));
    },

    getMemberByCohort: async (cohort: number): Promise<MemberInfo[]> => {
      const data = await getData();
      if (!data) throw new Error("Data not found");
      return data.filter((member) => member.cohort === cohort);
    },

    getMemberByGrade: async (grade: Grade): Promise<MemberInfo[]> => {
      const data = await getData();
      if (!data) throw new Error("Data not found");
      return data.filter((member) => member.grade === grade);
    },
  };
};
