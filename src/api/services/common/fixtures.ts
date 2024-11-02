import type { StudyConfig } from "../../config/type";
import type {
  GithubTeam,
  GithubMember,
  GithubTree,
} from "../../infra/github/types";
import { Grades, type Grade } from "../../type";
import type { Submission } from "./types";

export const mockStudyConfig: StudyConfig = {
  organization: "test-org",
  repository: "test-repo",
  branchName: "main",
  teamPrefix: "algodale",
  totalProblemCount: 4,
  gradeThresholds: [
    ["BIG_TREE", 3],
    ["SMALL_TREE", 2],
    ["SPROUT", 1],
    ["SEED", 0],
  ] as [Grade, number][],
};

export const mockGithubConfig = {
  baseUrl: "https://api.github.com",
  mediaType: "application/vnd.github+json",
  token: "test-token",
};

export const mockConfig = {
  study: mockStudyConfig,
  github: mockGithubConfig,
};

export const mockGithubTeams: GithubTeam[] = [
  {
    name: "algodale01",
    id: 1,
    node_id: "T",
    slug: "algodale01",
    description: "스터디",
    privacy: "closed",
    notification_setting: "notifications_enabled",
    url: "some-url",
    html_url: "some-url",
    members_url: "members-url",
    repositories_url: "repositories-url",
    permission: "pull",
    parent: null,
  },
  {
    name: "algodale02",
    id: 2,
    node_id: "T",
    slug: "algodale01",
    description: "스터디",
    privacy: "closed",
    notification_setting: "notifications_enabled",
    url: "some-url",
    html_url: "some-url",
    members_url: "members-url",
    repositories_url: "repositories-url",
    permission: "pull",
    parent: null,
  },
  {
    name: "another-team", // filtered out
    id: 3,
    node_id: "T",
    slug: "algodale01",
    description: "스터디",
    privacy: "closed",
    notification_setting: "notifications_enabled",
    url: "some-url",
    html_url: "some-url",
    members_url: "members-url",
    repositories_url: "repositories-url",
    permission: "pull",
    parent: null,
  }, // should be filtered out
];

export const mockGithubMembers: GithubMember[] = [
  { login: "algo", id: 1 },
  { login: "dale", id: 2 },
].map((member) => ({
  ...member,
  node_id: "M",
  avatar_url: "avatar-url",
  gravatar_id: "",
  url: "some-url",
  html_url: "some-url",
  followers_url: "some-url",
  following_url: "some-url",
  gists_url: "some-url",
  starred_url: "some-url",
  subscriptions_url: "some-url",
  organizations_url: "some-url",
  repos_url: "some-url",
  events_url: "some-url",
  received_events_url: "some-url",
  type: "User",
  user_view_type: "public",
  site_admin: false,
}));

export const mockGithubTree: GithubTree[] = [
  {
    path: "problem1/algo.js",
    type: "blob",
    mode: "100644",
    sha: "2",
    size: 0,
    url: "some-url",
  },
  {
    path: "problem1/dale.py",
    type: "blob",
    mode: "100644",
    sha: "2",
    size: 0,
    url: "some-url",
  },
  {
    path: "problem2/algo.ts",
    type: "blob",
    mode: "100644",
    sha: "2",
    size: 0,
    url: "some-url",
  },
  {
    path: "invalid/path",
    type: "blob",
    mode: "100644",
    sha: "2",
    size: 0,
    url: "some-url",
  },
  {
    path: "README.md",
    type: "blob",
    mode: "100644",
    sha: "2",
    size: 0,
    url: "some-url",
  }, // should be filtered out
];

export const mockMembers = mockGithubMembers.map((member) => ({
  id: member.login.toLowerCase(),
  name: member.login,
  profileUrl: member.avatar_url,
  cohort: 1,
  totalSubmissions: 2,
  submissions: [
    { memberId: member.login, problemTitle: "problem1", language: "js" },
    { memberId: member.login, problemTitle: "problem2", language: "ts" },
  ],
  progress: 50,
  grade: member.login === "algo" ? Grades.BIG_TREE : Grades.SPROUT,
}));

export const mockSubmissions: Submission[] = [
  {
    memberId: "algo",
    problemTitle: "problem1",
    language: "js",
  },
  {
    memberId: "algo",
    problemTitle: "problem2",
    language: "ts",
  },
  {
    memberId: "dale",
    problemTitle: "problem1",
    language: "py",
  },
];
