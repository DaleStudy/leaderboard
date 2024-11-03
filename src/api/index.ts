import { CONFIG } from "./config";
import { createStoreService } from "./services/store/storeService";

export const leaderBoardStore = await createStoreService(CONFIG);
