import { HeaderTuple } from "./types";

export interface IFetchClient {
  baseUrl: string;
  baseHeaders: ReadonlyArray<HeaderTuple>;

  setBaseUrl(baseUrl: string): IFetchClient;
  setBaseHeaders(baseHeaders: Array<HeaderTuple>): IFetchClient;
  get<T>(path: string): Promise<T>;
}
