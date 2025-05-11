import type { Grade } from "../services/types";
import type { Config } from "./types";

export const CONFIG: Config = {
  totalProblemCount: 75,
  gradeThresholds: [
    ["TREE", 70], // 나무
    ["FRUIT", 60], // 열매
    ["BRANCH", 45], // 가지
    ["LEAF", 30], // 잎새
    ["SPROUT", 15], // 새싹
    ["SEED", 0], // 씨앗
  ] as [Grade, number][],
} as const;
