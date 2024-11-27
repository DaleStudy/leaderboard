import { faker } from "@faker-js/faker";

import { problems } from "../../../constants/problems";
import type {
  GitHubMember,
  GitHubTeam,
  GitHubTree,
} from "../../infra/gitHub/types";
import { Grade, type MemberIdentity, type Submission } from "./types";

export const dummyConfig = {
  branchName: "main",
  teamPrefix: "algodale",
  totalProblemCount: 6,
  gradeThresholds: [
    ["TREE", 5],
    ["FRUIT", 4],
    ["BRANCH", 3],
    ["LEAF", 2],
    ["SPROUT", 1],
    ["SEED", 0],
  ] as [Grade, number][],
  gitHubToken: "test-token",
};

export const mockGitHubTeams: GitHubTeam[] = [
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

export const mockGitHubMembers: GitHubMember[] = [
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

export const mockGitHubTree: GitHubTree[] = [
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

export const mockMembers = mockGitHubMembers.map((member) => ({
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
  grade: member.login === "algo" ? Grade.TREE : Grade.SPROUT,
}));

export const createMockMemberIdentity = (
  customMember: Partial<MemberIdentity> = {},
): MemberIdentity => ({
  id: faker.internet.userName().toLowerCase(),
  name: faker.internet.userName(),
  cohort: faker.number.int({ min: 1, max: 10 }),
  profileUrl: faker.internet.url(),
  ...customMember,
});

export const createMockSubmission = (
  customSubmission: Partial<Submission> = {},
): Submission => ({
  memberId: faker.internet.userName(),
  problemTitle: faker.word.words().replaceAll(" ", "-"),
  language: faker.helpers.arrayElement(["js", "ts", "py"]),
  ...customSubmission,
});

export const createMockSubmissions = (
  memberId: string,
  count: number,
): Submission[] => {
  return faker.helpers.arrayElements(problems, count).map((problem) =>
    createMockSubmission({
      memberId,
      problemTitle: problem.title,
    }),
  );
};
