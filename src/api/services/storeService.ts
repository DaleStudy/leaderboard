import type { Config } from "../config/type";
import type { MemberInfo } from "./types";
import type { Grade } from "../type";
import { createFetchService } from "./fetchService";
import { createProcessService } from "./processService";

export const createStoreService = async (config: Config) => {
  let data: MemberInfo[] = [];
  const fetchService = createFetchService(config);
  const processService = createProcessService(config);

  const fetchAndProcessData = async (): Promise<MemberInfo[]> => {
    const [members, submissions] = await Promise.all([
      fetchService.fetchMembers(),
      fetchService.fetchSubmissions(config.study.repository),
    ]);

    data = processService.analyzeMemberInfo(members, submissions);

    return data;
  };

  const getData = async () => {
    if (!data.length) {
      return fetchAndProcessData();
    }
    return data;
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
