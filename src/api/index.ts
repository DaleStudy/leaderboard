import { RepositoryTree, SubmissionOfMember, SubmissionPath } from './types';
import { getMembersByCohort } from './getMembersByCohort';
import { getRepositoryDirectoryData } from './getRepoDirectoryData';
import { TOTAL_PROBLEMS } from './const';

/**
 * 전체 트리에서 필요한 데이터만 추출
 * 블롭이면서 /를 포함하는 데이터
 */
function extractRelevantData(data: RepositoryTree[]): SubmissionPath[] {
  return data
    .filter((item) => item.type === 'blob')
    .filter((item) => item.path.includes('/'))
    .map((item) => item.path.toLowerCase() as SubmissionPath);
}

/**
 * 제출 경로를 분석하여 필요한 정보를 추출
 */
function parseSubmissionPath(path: SubmissionPath): {
  memberId: string;
  problemTitle: string;
  language: string;
} {
  const regex = /^([^/]+)\/([^.]+)\.([a-zA-Z0-9]+)$/;
  const match = path.match(regex);

  if (match) {
    const problemTitle = match[1];
    const memberId = match[2];
    const language = match[3];
    return { memberId, problemTitle, language };
  }
  return { memberId: '', problemTitle: '', language: '' };
}

/**
 * 각 멤버별 제출 현황 디스플레이
 */
function displayProgress(
  memberMap: Record<string, SubmissionOfMember>
): string[] {
  const progressDisplay: string[] = [];
  const maxMemberIdLength = Math.max(
    ...Object.values(memberMap).map((member) => member.memberId.length)
  );
  Object.values(memberMap).forEach((member) => {
    const progressPercentage = (member.totalSubmissions / TOTAL_PROBLEMS) * 100;
    const progressBarLength = Math.ceil(progressPercentage / 2);
    const progressBar = '█'.repeat(progressBarLength).padEnd(50, ' ');

    progressDisplay.push(
      `${member.memberId.padEnd(maxMemberIdLength)} | ${progressBar} | ${
        member.totalSubmissions
      }/${TOTAL_PROBLEMS} (${progressPercentage.toFixed(2)}%)`
    );
  });
  return progressDisplay;
}

/**
 * 주어진 기수별 제출 현황을 출력한다.
 */
export async function printProcess(cohort: number) {
  try {
    // TODO: getTeams 추가
    // 필요한 데이터 조회
    const [membersOfCohort, repositoryDirectory] = await Promise.all([
      getMembersByCohort(cohort),
      getRepositoryDirectoryData(),
    ]);

    // 멤버별 제출 정보를 담을 객체 생성
    const memberMap: Record<string, SubmissionOfMember> = {};
    membersOfCohort.members.forEach((member) => {
      memberMap[member.id] = {
        memberId: member.id,
        totalSubmissions: 0,
        submissions: [],
      };
    });

    // 제출 정보를 memberMap에 저장
    const relevantData = extractRelevantData(repositoryDirectory);
    relevantData.forEach((path) => {
      const { memberId, problemTitle, language } = parseSubmissionPath(path);
      if (memberMap[memberId]) {
        if ( // 다수의 언어로 제출한 경우 중복 제출로 간주하지 않음
          !memberMap[memberId].submissions.some(
            (s) => s.problemTitle === problemTitle
          )
        ) {
          memberMap[memberId].totalSubmissions += 1;
        }
        memberMap[memberId].submissions.push({
          memberId,
          problemTitle,
          language,
        });
      }
    });

    const progressArray = displayProgress(memberMap);
    const progressString = progressArray.join('\n'); // 문자열로 변환

    console.log(progressString);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`An error occurred: ${error.message}`);
    } else {
      console.error('An error occurred:', error);
    }
  }
}

// 전체 함수 호출
await printProcess(2);
