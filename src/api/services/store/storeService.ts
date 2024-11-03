import type { Config } from "../../config/type";
import type { MemberInfo } from "../common/types";
import type { Grade } from "../../type";
import { createFetchService } from "../fetch/fetchService";
import { createProcessService } from "../process/processService";

export const createStoreService = async (config: Config) => {
  let fetchedData: MemberInfo[] = [];
  const fetchService = createFetchService(config);
  const processService = createProcessService(config);

  const fetchAndProcessData = async (): Promise<MemberInfo[]> => {
    const [members, submissions] = await Promise.all([
      fetchService.fetchMembers(),
      fetchService.fetchSubmissions(config.study.repository),
    ]);

    fetchedData = processService.analyzeMemberInfo(members, submissions);

    return fetchedData;
  };

  const getData = async () => {
    if (fetchedData.length) return fetchedData;
    return fetchAndProcessData();
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
