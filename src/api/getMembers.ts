import { CONFIG } from "./config";
import { createFetchService } from "./services/fetch/fetchService";
import { createProcessService } from "./services/process/processService";
import { type Member } from "./services/types";

export async function getMembers(): Promise<Member[]> {
  const fetchService = createFetchService(CONFIG);
  const processService = createProcessService(CONFIG);

  const [memberIdentities, submissions] = await Promise.all([
    fetchService.fetchMembers(),
    fetchService.fetchSubmissions("leetcode-study"),
  ]);

  return processService.getMembers(memberIdentities, submissions);
}