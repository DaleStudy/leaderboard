import Aside from "../Aside/Aside";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Table from "../Table/Table";
import { getMembers } from "../../api/getMembers";
import { problems } from "../../constants/problems";
import useMembers from "../../hooks/useMembers";
import styles from "./Progress.module.css";

export default function Progress() {
  const { members, isLoading, error } = useMembers({ getMembers });
  console.log({ members, isLoading, error });

  const memberId = new URL(location.href).searchParams.get("member"); // Using URL to fetch member ID

  if (isLoading) return <p>Loading...</p>; // TODO replace with a proper loading component
  if (error) return <p>Error!</p>; // TODO replace with a proper error component

  const member = members.find((m) => m.id === memberId);
  if (!member) return <p>Member not found!</p>;

  // Calculate total tasks dynamically
  const totalTasks = problems.length;
  const easyProblemsCount = problems.filter(
    (problem) => problem.difficulty === "easy",
  ).length;
  const mediumProblemsCount = problems.filter(
    (problem) => problem.difficulty === "medium",
  ).length;
  const hardProblemsCount = problems.filter(
    (problem) => problem.difficulty === "hard",
  ).length;

  const easySolved = member.solvedProblems.filter(
    (p) => p.difficulty === "easy",
  ).length;
  const mediumSolved = member.solvedProblems.filter(
    (p) => p.difficulty === "medium",
  ).length;
  const hardSolved = member.solvedProblems.filter(
    (p) => p.difficulty === "hard",
  ).length;
  const totalSolved = member.solvedProblems.length;

  const easyTasks = `${easySolved}/${easyProblemsCount}`;
  const mediumTasks = `${mediumSolved}/${mediumProblemsCount}`;
  const hardTasks = `${hardSolved}/${hardProblemsCount}`;

  const grade = member.grade;

  const cohort = member.cohort;

  const profile_url = member.profileUrl || "SampleImg.png";

  //TODO: need to pass the right member
  const mockProblems = [
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
          <Aside
            githubUsername={member.name}
            easyTasks={easyTasks}
            mediumTasks={mediumTasks}
            hardTasks={hardTasks}
            solvedTasks={totalSolved}
            totalTasks={totalTasks}
            profile_url={profile_url}
            cohort={cohort}
            grade={grade}
          />
        </section>

        <section className={styles.problemList} aria-labelledby="problem-list">
          <Table problems={mockProblems} />
        </section>
      </div>

      <Footer />
    </main>
  );
}
