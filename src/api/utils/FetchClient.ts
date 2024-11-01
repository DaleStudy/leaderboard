import { IFetchClient } from "./interfaces";
import type { HeaderTuple } from "./types";

export class FetchClient implements IFetchClient {
  constructor(
    private _baseUrl: string = "",
    private _baseHeaders: HeaderTuple[] = [],
  ) {}

  get baseUrl(): string {
    return this._baseUrl;
  }

  get baseHeaders(): ReadonlyArray<HeaderTuple> {
    return this._baseHeaders;
  }

  setBaseUrl(baseUrl: string): IFetchClient {
    this._baseUrl = baseUrl.trim();
    return this;
  }

  setBaseHeaders(baseHeaders: HeaderTuple[]): IFetchClient {
    this._baseHeaders = [...baseHeaders];
    return this;
  }

  async get<T>(path: string): Promise<T> {
    try {
      const response = await fetch(this.baseUrl + path, {
        headers: this.baseHeaders.reduce(
          (acc: { [key: string]: string }, [key, value]) => {
            acc[key] = acc[key] ? acc[key] + "," + value : value;
            return acc;
          },
          {},
        ),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json() as Promise<T>;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }
}
