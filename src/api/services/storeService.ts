import type { Config } from "../config/type";
import type { MemberInfo } from "./types";
import type { Grade } from "../type";
import { createFetchService } from "./fetchService";
import { createProcessService } from "./processService";

const STORAGE_KEY = "leaderBoardData";
const STORAGE_EXPIRES = 1000 * 60 * 60 * 8; // 8 hours

export const createStoreService = async (config: Config) => {
  let cachedData: MemberInfo[] = [];
  const fetchService = createFetchService(config);
  const processService = createProcessService(config);

  const fetchAndProcessData = async (): Promise<MemberInfo[]> => {
    const [members, submissions] = await Promise.all([
      fetchService.fetchMembers(),
      fetchService.fetchSubmissions(config.study.repository),
    ]);

    cachedData = processService.analyzeMemberInfo(members, submissions);
    saveToStorage(cachedData);

    return cachedData;
  };

  const getData = async (isHardRefresh: boolean = false) => {
    if (!isHardRefresh) {
      if (cachedData.length) return cachedData;

      const storageData = loadFromStorage();
      if (storageData) {
        cachedData = storageData;
        return cachedData;
      }
    }

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

const saveToStorage = (data: MemberInfo[]) => {
  try {
    const cacheData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
};

const loadFromStorage = (): MemberInfo[] | null => {
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > STORAGE_EXPIRES) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Failed to load from localStorage:", error);
    return null;
  }
};
