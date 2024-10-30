import {
  StudyInfo,
  StudyData,
  Member,
  Cohort,
  Submission,
  MemberInfo,
  Grades,
} from "./types";
import { IGithubApiClient } from "../github/interfaces";
import { IMemberInfoService } from "./interfaces";
import { handleError } from "../../common";
import { GithubTree } from "../github/types";

export class MemberInfoService implements IMemberInfoService {
  constructor(
    private readonly githubApiClient: IGithubApiClient,
    private readonly config: StudyInfo,
  ) {}

  async getMemberInfo(): Promise<StudyData> {
    try {
      const members = await this.getAllTeamMembers();
      const submissions = await this.getSubmissionData();
      const memberInfoMap = this.createMemberInfoMap(members, submissions);

      return {
        total: members.length,
        data: Object.values(memberInfoMap),
      };
    } catch (error) {
      handleError("Error getting member info", error);
      return { total: 0, data: [] };
    }
  }

  private async getAllTeamMembers(): Promise<Member[]> {
    const teams = await this.getTeams();
    const membersByTeam = await Promise.all(
      teams.map((team) => this.getTeamMembers(team)),
    );

    const memberMap = new Map<string, Member>();

    membersByTeam.flat().forEach((member) => {
      const existingMember = memberMap.get(member.id);
      if (!existingMember || member.cohort > existingMember.cohort) {
        memberMap.set(member.id, member);
      }
    });

    return Array.from(memberMap.values());
  }

  private async getTeams(): Promise<string[]> {
    try {
      const teams = await this.githubApiClient.getTeams(this.config.orgName);
      return teams
        .filter((team) => team.name.startsWith(this.config.teamPrefix))
        .map((team) => team.name);
    } catch (error) {
      handleError("Error fetching teams", error);
      return [];
    }
  }

  private async getTeamMembers(teamName: string): Promise<Member[]> {
    try {
      const cohort = this.extractCohortFromTeamName(teamName);
      const members = await this.githubApiClient.getTeamMembers(
        this.config.orgName,
        teamName,
      );

      return members.map((member) => ({
        id: member.login.toLowerCase(),
        name: member.login,
        cohort,
      }));
    } catch (error) {
      handleError(`Error fetching members for team ${teamName}`, error);
      return [];
    }
  }

  private extractCohortFromTeamName(teamName: string): Cohort {
    const cohortNumber =
      parseInt(teamName.replace(this.config.teamPrefix, "")) || 2; // TODO: Default cohort number
    if (isNaN(cohortNumber)) {
      throw new Error(`Invalid team name format: ${teamName}`);
    }
    return cohortNumber as Cohort;
  }

  private async getSubmissionData(): Promise<Submission[]> {
    try {
      const tree = await this.githubApiClient.getDirectoryTree(
        this.config.repoOwner,
        this.config.repoName,
        this.config.branchName,
      );

      return this.extractRelevantData(tree)
        .map(this.parseSubmissionPath)
        .filter(this.isValidSubmission);
    } catch (error) {
      handleError("Error fetching submission data", error);
      return [];
    }
  }

  private extractRelevantData(tree: GithubTree[]): string[] {
    return tree
      .filter((item) => item.type === "blob" && item.path.includes("/"))
      .map((item) => item.path.toLowerCase());
  }

  private parseSubmissionPath(path: string): Submission {
    const regex = /^([^/]+)\/([^.]+)\.([a-zA-Z0-9]+)$/;
    const match = path.match(regex);

    if (!match) {
      return { memberId: "", problemTitle: "", language: "" };
    }

    const [, problemTitle, memberId, language] = match;
    return { memberId, problemTitle, language };
  }

  private isValidSubmission(submission: Submission): boolean {
    return Boolean(
      submission.memberId && submission.problemTitle && submission.language,
    );
  }

  private createMemberInfoMap(
    members: Member[],
    submissions: Submission[],
  ): Record<string, MemberInfo> {
    const memberMap: Record<string, MemberInfo> = {};

    // Member Info 초기화
    members.forEach((member) => {
      memberMap[member.id] = {
        ...member,
        totalSubmissions: 0,
        submissions: [],
        progress: 0,
        grade: Grades.Seed,
      };
    });

    // 제출 정보 기입
    submissions.forEach((submission) => {
      const member = memberMap[submission.memberId];
      if (!member) return;

      const isNewProblem = !member.submissions.some(
        (s) => s.problemTitle === submission.problemTitle,
      );

      if (isNewProblem) {
        member.totalSubmissions += 1;
      }

      member.submissions.push(submission);
    });

    // 진도율, 등급 계산
    Object.values(memberMap).forEach((member) => {
      // 소수점 첫째자리까지 반올림
      member.progress =
        Math.round(
          (member.totalSubmissions / this.config.totalProblemCount) * 1000,
        ) / 10;
      if (member.totalSubmissions === 0) {
        member.grade = Grades.Seed;
      } else if (member.totalSubmissions < 25) {
        member.grade = Grades.Sprout;
      } else if (member.totalSubmissions < 50) {
        member.grade = Grades.SmallTree;
      } else {
        member.grade = Grades.BigTree;
      }
    });

    return memberMap;
  }
}
