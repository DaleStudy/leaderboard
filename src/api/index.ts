import { CONFIG } from "./config";
import { createFetchService } from "./services/fetchService";
import { createProcessService } from "./services/processService";

async function main() {
  const fetchService = createFetchService(CONFIG);
  const [members, submissions] = await Promise.all([
    fetchService.fetchMembers(),
    fetchService.fetchSubmissions(CONFIG.study.repository),
  ]);

  const processService = createProcessService(CONFIG);

  const { data } = processService.analyzeMemberInfo(members, submissions);

  console.log(data.slice(0, 5));
}

main().catch(console.error);
