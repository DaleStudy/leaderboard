import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import { getMembers } from "../../api/getMembers";
import useMembers from "../../hooks/useMembers";
import Card from "../Card/Card";

import styles from "./Leaderboard.module.css";

export default function Leaderboard() {
  const { members, isLoading, error } = useMembers({ getMembers });

  if (isLoading) return <p>Loading...</p>; // TODO replace with a proper loading component
  if (error) return <p>Error!</p>; // TODO replace with a proper error component

  return (
    <main className={styles.leaderboard}>
      <Header />
      <h1>리더보드</h1>
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            <Card
              id={member.id}
              name={member.name}
              cohort={member.cohort}
              grade={member.grade}
            />
          </li>
        ))}
      </ul>
      <Footer />
    </main>
  );
}
