import { CONFIG } from "./config";
import { GithubApiClient } from "./services/github/GithubApiClient";
import { MemberInfoService } from "./services/memberInfo/MemberInfoService";
import { FetchClient } from "./utils/FetchClient";

async function main() {
  const fetchClient = new FetchClient();
  const githubClient = new GithubApiClient(fetchClient, CONFIG.github.token);
  const memberService = new MemberInfoService(githubClient, CONFIG.study);

  const { data } = await memberService.getMemberInfo();
  console.log(data.slice(0, 5));
}

main().catch(console.error);
