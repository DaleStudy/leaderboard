import { CONFIG } from "./config";
import { MemberInfoService } from "./services/memberInfo/MemberInfoService";

async function main() {
  const memberService = new MemberInfoService(CONFIG);

  const { data } = await memberService.getMemberInfo();
  console.log(data.slice(0, 5));
}

main().catch(console.error);
