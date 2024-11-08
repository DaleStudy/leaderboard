import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Table from "../Table/Table";

import { getMembers } from "../../api/services/store/storeService";
import useMembers from "../../hooks/useMembers";

import styles from "./Progress.module.css";

export default function Progress() {
  const { members, isLoading, error } = useMembers({ getMembers });
  console.log({ members, isLoading, error });

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
      <h1>Progress</h1>
      <div className={styles.container}>
        <section aria-labelledby="profile">
          <h2 id="profile">Profile Section</h2>
          <div>
            <img src="profile_image_url" alt="Profile" />
            <h3>0 Attempting</h3>
            <p>Easy: 12/12</p>
            <p>Med.: 22/22</p>
            <p>Hard: 1/1</p>
          </div>
          <button>PR 리스트</button>
        </section>

        <section className={styles.problemList} aria-labelledby="problem-list">
          <Table problems={problems} />
        </section>
      </div>

      <Footer />
    </main>
  );
}
