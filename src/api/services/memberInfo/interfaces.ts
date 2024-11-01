import type { StudyData } from "./types";

export interface IMemberInfoService {
  getMemberInfo(): Promise<StudyData>;
}
