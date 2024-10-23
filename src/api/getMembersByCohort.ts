import { ALTERNATIVE_IDS, GITHUB_API_BASE_URL } from './const';
import { Cohort, CohortInfo } from './types';
import { fetchWithCache } from './utils';

const GITHUB_TOKEN = 'process.env.GITHUB_TOKEN'; // TODO: Github Token을 환경변수로 설정

export async function getMembersByCohort(cohort: number): Promise<CohortInfo> {
  return fetchWithCache(`members_cohort_${cohort}`, async () => {
    const teamName = ['', 'leetcode01', 'leetcode']; // TODO: getTeams 에서 가져와 주입 받도록 수정
    const url = `/orgs/DaleStudy/teams/${teamName[cohort]}/members`;
    const headers = {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    };

    try {
      const res = await fetch(GITHUB_API_BASE_URL + url, { headers });

      if (!res.ok)
        throw new Error(`Failed to fetch members: ${res.statusText}`);

      const data = await res.json();
      return {
        cohort: cohort as Cohort,
        totalMembers: data.length,
        members: data.map((member: { login: string }) => ({
          id:
            ALTERNATIVE_IDS[member.login.toLowerCase()] || // 파일명이 Github 계정과 다른 경우
            member.login.toLowerCase(),
          name: member.login,
        })),
      };
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Error fetching cohort members: ${err.message}`);
      } else {
        console.error('Error fetching cohort members:', err);
      }
      return { cohort: cohort as Cohort, totalMembers: 0, members: [] };
    }
  });
}
