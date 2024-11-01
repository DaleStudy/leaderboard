import { CONFIG } from "./config";
import { GithubApiClient } from "./services/github/GithubApiClient";
import { MemberInfoService } from "./services/memberInfo/MemberInfoService";

async function main() {
  const githubClient = new GithubApiClient(CONFIG.github.token);
  const memberService = new MemberInfoService(githubClient, CONFIG.study);

  const { data } = await memberService.getMemberInfo();
  console.log(data.slice(0, 5));
}

main().catch(console.error);
