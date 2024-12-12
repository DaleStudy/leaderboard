import {
  problemCounts,
  problemMap,
  problems,
} from "../../api/constants/problems";
import { getMembers } from "../../api/getMembers";
import useMembers from "../../hooks/useMembers";

import EmptySidebar from "../../components/EmptySidebar/EmptySidebar";
import Layout from "../../components/Layout/Layout";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Table } from "../../components/Table/Table";

import styles from "./Progress.module.css";

export default function Progress() {
  const { members, isLoading, error } = useMembers({ getMembers });

  const memberId = new URL(location.href).searchParams.get("member");

  if (isLoading) return <p>Loading...</p>;

  if (error) {
    return (
      <Layout>
        <main className={styles.progress}>
          <h1>풀이 현황</h1>
          <div className={styles.container}>
            <section className={styles.sideBar} aria-labelledby="profile">
              <EmptySidebar />
            </section>

            <section
              className={styles.problemTableWrapper}
              aria-labelledby="problem-list"
            >
              <Table isError problems={[]} solvedProblems={[]} />
            </section>
          </div>
        </main>
      </Layout>
    );
  }

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

  const { grade, cohort } = member;

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
              cohort={cohort}
              grade={grade}
            />
          </section>

          <section
            className={styles.problemTableWrapper}
            aria-labelledby="problem-list"
          >
            <Table problems={problems} solvedProblems={member.solvedProblems} />
          </section>
        </div>
      </main>
    </Layout>
  );
}
