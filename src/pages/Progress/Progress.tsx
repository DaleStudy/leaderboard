import Layout from "../../components/Layout/Layout";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Table } from "../../components/Table/Table";
import { getMembers } from "../../api/getMembers";
import {
  problems,
  problemMap,
  problemCounts,
} from "../../api/constants/problems";

import useMembers from "../../hooks/useMembers";
import styles from "./Progress.module.css";

export default function Progress() {
  const { members, isLoading, error } = useMembers({ getMembers });

  const memberId = new URL(location.href).searchParams.get("member");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>; // TODO replace with a proper error component

  const member = members.find((m) => m.id === memberId);
  if (!member) return <p>Member not found!</p>;

  const totalProblems = Object.values(problemMap).length;
  const {
    Easy: easyProblemsCount,
    Med: mediumProblemsCount,
    Hard: hardProblemsCount,
  } = problemCounts;

  const solvedCounts = member.solvedProblems.reduce(
    (acc, problem) => {
      acc[problem.difficulty] = (acc[problem.difficulty] || 0) + 1;
      acc.total += 1;
      return acc;
    },
    { Easy: 0, Med: 0, Hard: 0, total: 0 },
  );

  const {
    Easy: easySolved,
    Med: mediumSolved,
    Hard: hardSolved,
    total: totalSolved,
  } = solvedCounts;

  const easyProgress = `${easySolved}/${easyProblemsCount}`;
  const mediumProgress = `${mediumSolved}/${mediumProblemsCount}`;
  const hardProgress = `${hardSolved}/${hardProblemsCount}`;

  const { grade, currentCohort, cohorts } = member;

  const profileUrl = member.profileUrl || "Logo.png";

  return (
    <Layout>
      <main className={styles.progress}>
        <h1>풀이 현황</h1>
        <div className={styles.container}>
          <section className={styles.sideBar} aria-labelledby="profile">
            <Sidebar
              githubUsername={member.name}
              easyProgress={easyProgress}
              mediumProgress={mediumProgress}
              hardProgress={hardProgress}
              solvedProblems={totalSolved}
              totalProblems={totalProblems}
              profileUrl={profileUrl}
              currentCohort={currentCohort}
              cohorts={cohorts}
              grade={grade}
            />
          </section>

          <section
            className={styles.problemList}
            aria-labelledby="problem-list"
          >
            <Table problems={problems} solvedProblems={member.solvedProblems} />
          </section>
        </div>
      </main>
    </Layout>
  );
}
