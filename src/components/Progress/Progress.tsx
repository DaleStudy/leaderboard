import { getMembers } from "../../api/getMembers";
import { problemCounts, problemMap } from "../../constants/problems";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
<<<<<<< HEAD
<<<<<<< HEAD
import { Table } from "../Table/Table";
=======
import Table from "../Table/Table";
>>>>>>> da91128 (feat : complete progress component)
=======
import { Table } from "../Table/Table";
>>>>>>> b7f50c1 (feat : apply feedback)
import { getMembers } from "../../api/getMembers";
import { problems, problemMap, problemCounts } from "../../constants/problems";

import useMembers from "../../hooks/useMembers";
import styles from "./Progress.module.css";

export default function Progress() {
<<<<<<< HEAD
<<<<<<< HEAD
  const { members, isLoading, error } = useMembers({ getMembers });
=======
  const { members, isLoading, error } = useMembers({ getMembers });  
>>>>>>> da91128 (feat : complete progress component)
=======
  const { members, isLoading, error } = useMembers({ getMembers });
>>>>>>> 2434ee4 (update : adjust stories and test with new props)

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

  const { grade, cohort } = member;

  const profileUrl = member.profileUrl || "Logo.png";

<<<<<<< HEAD
<<<<<<< HEAD
=======
  // To be updated, this will be replaced by the real data in a seperate pr.
  const mockedProblems = [
  // Calculate total tasks dynamically
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

>>>>>>> da91128 (feat : complete progress component)
=======
>>>>>>> de28551 (update : change the difficulty to adjust to design and related codes to match it)
  return (
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

        <section className={styles.problemList} aria-labelledby="problem-list">
<<<<<<< HEAD
<<<<<<< HEAD
          <Table problems={problems} solvedProblems={member.solvedProblems} />
=======
          <Table problems={problems}
                 solvedProblems={member.solvedProblems}
          />
>>>>>>> de28551 (update : change the difficulty to adjust to design and related codes to match it)
=======
          <Table problems={problems} solvedProblems={member.solvedProblems} />
>>>>>>> a89544a (fix : adjust the margin for design)
        </section>
      </div>
    </main>
  );
}
