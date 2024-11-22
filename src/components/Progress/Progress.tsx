import Aside from "../Aside/Aside";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Table from "../Table/Table";

import { getMembers } from "../../api/getMembers";
import useMembers from "../../hooks/useMembers";

import styles from "./Progress.module.css";

export default function Progress() {
  const { members, isLoading, error } = useMembers({ getMembers });
  console.log({ members, isLoading, error });

  const githubUsername = "exampleUser";
  const easyTasks = "5/10";
  const mediumTasks = "3/10";
  const hardTasks = "1/10";
  const solvedTasks = 30;
  const totalTasks = 30;

  const problems = [
    {
      id: 128,
      title: "Longest Consecutive Sequence",
      difficulty: "Med.",
      completed: true,
    },
    { id: 1, title: "Two Sum", difficulty: "Easy", completed: true },
    {
      id: 257,
      title: "Binary Tree Paths",
      difficulty: "Easy",
      completed: false,
    },
    { id: 133, title: "Clone Graph", difficulty: "Med.", completed: true },
  ];

  return (
    <main className={styles.progress}>
      <Header />
      <h1>풀이 현황</h1>
      <div className={styles.container}>
        <section aria-labelledby="profile">
          {/* Pass required props to Aside */}
          <Aside
            githubUsername={githubUsername}
            easyTasks={easyTasks}
            mediumTasks={mediumTasks}
            hardTasks={hardTasks}
            solvedTasks={solvedTasks}
            totalTasks={totalTasks}
          />
        </section>

        <section className={styles.problemList} aria-labelledby="problem-list">
          <Table problems={problems} />
        </section>
      </div>

      <Footer />
    </main>
  );
}
