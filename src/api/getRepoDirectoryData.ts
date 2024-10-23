import { GITHUB_API_BASE_URL } from './const';
import { RepositoryTree } from './types';
import { fetchWithCache } from './utils';

export async function getRepositoryDirectoryData(): Promise<RepositoryTree[]> {
  return fetchWithCache('repository_directory', async () => {
    const url = `/repos/DaleStudy/leetcode-study/git/trees/main?recursive=1`; // recursive=1로 충분하다.
    const headers = {
      Accept: 'application/vnd.github+json',
    };

    try {
      const res = await fetch(GITHUB_API_BASE_URL + url, { headers });

      if (!res.ok)
        throw new Error(
          `Failed to fetch repository directory: ${res.statusText}`
        );

      const data = await res.json();
      return data.tree;
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Error fetching repository directory: ${err.message}`);
      } else {
        console.error('Error fetching repository directory:', err);
      }
      return [];
    }
  });
}
