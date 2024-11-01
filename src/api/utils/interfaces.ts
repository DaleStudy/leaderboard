import type { HeaderTuple } from "./types";

export interface IFetchClient {
  readonly baseUrl: string;
  readonly baseHeaders: ReadonlyArray<HeaderTuple>;

  setBaseUrl(baseUrl: string): IFetchClient;
  setBaseHeaders(baseHeaders: Array<HeaderTuple>): IFetchClient;
  get<T>(path: string): Promise<T>;
}
