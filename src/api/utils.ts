// 캐시를 저장할 객체
const cache: Record<string, { data: unknown; timestamp: number }> = {};
const CACHE_DURATION = 10 * 60 * 1000; // 10분 (밀리초 단위)

// 캐시를 이용한 데이터 요청 함수
export async function fetchWithCache<T>(
  key: string,
  fetchFunction: () => Promise<T>
): Promise<T> {
  const currentTime = Date.now();
  const cached = cache[key];

  // 캐시가 존재하고 만료되지 않았다면 데이터 반환
  if (cached) {
    if (currentTime - cached.timestamp < CACHE_DURATION) {
      console.log(
        `${new Date(
          currentTime
        ).toISOString()} - Returning cached data for key: ${key}`
      );
      return cached.data as T;
    } else {
      // 만료된 캐시는 삭제
      console.log(
        `${new Date(
          currentTime
        ).toISOString()} - Cache expired for key: ${key}, removing from cache`
      );
      delete cache[key];
    }
  }

  // API 호출 후 새로 캐시에 저장
  const data = await fetchFunction();
  cache[key] = { data, timestamp: currentTime };
  console.log(
    `${new Date(currentTime).toISOString()} - Fetched new data for key: ${key}`
  );
  return data;
}

// 요청을 추적하기 위한 캐시
const rateLimitCache: Record<string, { count: number; timestamp: number }> = {};
const RATE_LIMIT_DURATION = 60 * 1000; // 1분 (밀리초 단위)
const MAX_REQUESTS_PER_MINUTE = 60; // 1분당 최대 60회 요청

// 레이트 리미트 체크 함수
export function isRateLimited(ip: string): boolean {
  const currentTime = Date.now();
  const cacheEntry = rateLimitCache[ip];

  // 캐시에 IP가 없거나, 제한 시간이 지난 경우 초기화
  if (!cacheEntry || currentTime - cacheEntry.timestamp > RATE_LIMIT_DURATION) {
    rateLimitCache[ip] = { count: 1, timestamp: currentTime };
    return false;
  }

  // 요청 횟수를 초과한 경우
  if (cacheEntry.count >= MAX_REQUESTS_PER_MINUTE) {
    return true;
  }

  // 요청 횟수를 증가시킴
  cacheEntry.count += 1;
  return false;
}
