import type { Config } from "../../config/type";
import { createFetchService } from "../fetch/fetchService";
import { createProcessService } from "../process/processService";

export async function fetchLeaderBoard(config: Config) {
  const fetchService = createFetchService(config);
  const processService = createProcessService(config);

  const [members, submissions] = await Promise.all([
    fetchService.fetchMembers(),
    fetchService.fetchSubmissions(config.study.repository),
  ]);

  return processService.analyzeMemberInfo(members, submissions);
}
