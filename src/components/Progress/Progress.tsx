import Aside from "../Aside/Aside";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Table from "../Table/Table";
import { getMembers } from "../../api/getMembers";
import { problems } from "../../constants/problems";
import { problemMap, problemCounts } from "../../constants/problems";


import useMembers from "../../hooks/useMembers";
import styles from "./Progress.module.css";

export default function Progress() {
  const { members, isLoading, error } = useMembers({ getMembers });
  console.log({ members, isLoading, error });

  const memberId = new URL(location.href).searchParams.get("member");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>; // TODO replace with a proper error component

  const member = members.find((m) => m.id === memberId);
  if (!member) return <p>Member not found!</p>;

  const totalTasks = Object.values(problemMap).length;
  const {
    easy: easyProblemsCount,
    medium: mediumProblemsCount,
    hard: hardProblemsCount,
  } = problemCounts;

  const solvedCounts = member.solvedProblems.reduce(
    (acc, problem) => {
      acc[problem.difficulty] = (acc[problem.difficulty] || 0) + 1;
      acc.total += 1;
      return acc;
    },
    { easy: 0, medium: 0, hard: 0, total: 0 },
  );

  const {
    easy: easySolved,
    medium: mediumSolved,
    hard: hardSolved,
    total: totalSolved,
  } = solvedCounts;

  const easyProgress = `${easySolved}/${easyProblemsCount}`;
  const mediumProgress = `${mediumSolved}/${mediumProblemsCount}`;
  const hardProgress = `${hardSolved}/${hardProblemsCount}`;

  const { grade, cohort } = member;

  const profile_url = member.profileUrl || "Logo.png";

  // To be updated, this will be replaced by the real data in a seperate pr.
  const mockedProblems = [
    {
      id: 1,
      title: "Problem 1",
      difficulty: "easy",
      completed: true,
    },
    {
      id: 2,
      title: "Problem 2",
      difficulty: "medium",
      completed: false,
    },
    {
      id: 3,
      title: "Problem 3",
      difficulty: "hard",
      completed: true,
    },
  ];

  return (
    <main className={styles.progress}>
      <Header />
      <h1>풀이 현황</h1>
      <div className={styles.container}>
        <section aria-labelledby="profile">
          <Aside
            githubUsername={member.name}
            easyProgress={easyProgress}
            mediumProgress={mediumProgress}
            hardProgress={hardProgress}
            solvedTasks={totalSolved}
            totalTasks={totalTasks}
            profile_url={profile_url}
            cohort={cohort}
            grade={grade}
          />
        </section>

        <section className={styles.problemList} aria-labelledby="problem-list">
          <Table problems={mockedProblems} />
        </section>
      </div>

      <Footer />
    </main>
  );
}
