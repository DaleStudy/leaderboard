import { CONFIG } from "./config";
import { createStoreService } from "./services/storeService";

export const leaderBoardStore = await createStoreService(CONFIG);

console.log(await leaderBoardStore.getData());
console.log(await leaderBoardStore.getMemberById("hc"));
console.log(await leaderBoardStore.getMemberByCohort(1));
console.log(await leaderBoardStore.getMemberByGrade("SEED"));
