import { test, expect, beforeEach, vi, beforeAll, afterAll } from "vitest";
import { FetchClient } from "./FetchClient";
import { mockClientUrl, mockGithubToken } from "./fixtures";

let client: FetchClient;

beforeAll(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  vi.restoreAllMocks();
});

beforeEach(() => {
  client = new FetchClient();
  // Prevent actual network requests
  global.fetch = vi.fn();
});

test("it should be initialized with default values", () => {
  expect(client.baseUrl).toBe("");
  expect(client.baseHeaders).toEqual([]);
});

test("it should set base URL correctly", () => {
  // Act
  client.setBaseUrl(mockClientUrl);

  // Assert
  expect(client.baseUrl).toBe(mockClientUrl);
});

test("it should trim base URL when setting", () => {
  // Act
  client.setBaseUrl(`     ${mockClientUrl}     `);

  // Assert
  expect(client.baseUrl).toBe(mockClientUrl);
});

test("it should set base headers correctly", () => {
  // Arrange
  const headers: [string, string][] = [
    ["Authorization", `Bearer ${mockGithubToken}`],
    ["Content-Type", "application/json"],
  ];

  // Act
  client.setBaseHeaders(headers);

  // Assert
  expect(client.baseHeaders).toEqual(headers);
});

test("it should make a copy of base headers", () => {
  // Arrange
  const headers: [string, string][] = [
    ["Authorization", `Bearer ${mockGithubToken}`],
  ];

  // Act
  client.setBaseHeaders(headers);
  headers.push(["Content-Type", "application/json"]);

  // Assert
  expect(client.baseHeaders).toHaveLength(1);
});

test("it should make GET request with correct URL and headers", async () => {
  // Arrange
  const mockResponse = { data: "test" };
  vi.mocked(global.fetch).mockResolvedValueOnce(
    new Response(JSON.stringify(mockResponse), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }),
  );

  client
    .setBaseUrl(mockClientUrl)
    .setBaseHeaders([["Authorization", `Bearer ${mockGithubToken}`]]);

  // Act
  const result = await client.get("/test");

  // Assert
  expect(result).toEqual(mockResponse);
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(
    `${mockClientUrl}/test`,
    expect.objectContaining({
      headers: expect.objectContaining({
        Authorization: `Bearer ${mockGithubToken}`,
      }),
    }),
  );
});

test("it should combine multiple headers with same key", async () => {
  // Arrange
  const mockResponse = { data: "test" };
  vi.mocked(global.fetch).mockResolvedValueOnce(
    new Response(JSON.stringify(mockResponse), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }),
  );

  client.setBaseUrl(mockClientUrl).setBaseHeaders([
    ["Accept", "application/json"],
    ["Accept", "text/plain"],
  ]);

  // Act
  await client.get("/test");

  // Assert
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(
    expect.any(String),
    expect.objectContaining({
      headers: expect.objectContaining({
        Accept: "application/json,text/plain",
      }),
    }),
  );
});

test("it should throw error when response is NOT ok", async () => {
  // Arrange
  vi.mocked(global.fetch).mockResolvedValueOnce(
    new Response("Not found", { status: 404 }),
  );

  // Act & Assert
  await expect(client.get("/test")).rejects.toThrow("HTTP error! status: 404");
});

test("it should throw error when fetch fails", async () => {
  // Arrange
  const networkError = new Error("Network error");
  vi.mocked(global.fetch).mockRejectedValueOnce(networkError);

  // Act & Assert
  await expect(client.get("/test")).rejects.toThrow("Network error");
});
