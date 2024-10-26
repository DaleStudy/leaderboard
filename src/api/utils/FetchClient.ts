import { IFetchClient } from "./interfaces";
import { HeaderTuple } from "./types";

export class FetchClient implements IFetchClient {
  constructor(
    public baseUrl: string = "",
    public baseHeaders: HeaderTuple[] = [],
  ) {}

  setBaseUrl(baseUrl: string): this {
    this.baseUrl = baseUrl.trim();
    return this;
  }

  setBaseHeaders(baseHeaders: HeaderTuple[]): this {
    this.baseHeaders = [...baseHeaders];
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
