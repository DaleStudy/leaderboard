import { CONFIG } from "../../config";
import type { Member } from "../common/types";
import { createFetchService } from "../fetch/fetchService";
import { createProcessService } from "../process/processService";

export async function getMembers(): Promise<Member[]> {
  const fetchService = createFetchService(CONFIG);
  const processService = createProcessService(CONFIG);

  const [memberIdentities, submissions] = await Promise.all([
    fetchService.fetchMembers(),
    fetchService.fetchSubmissions("leetcode-study"),
  ]);

  return processService.getMembers(memberIdentities, submissions);
}
