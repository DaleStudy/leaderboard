import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import { getMembers } from "../../api/services/getMembers/getMembers";
import useMembers from "../../hooks/useMembers";

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
          <article key={member.name}>
            <header>
              <h2>{member.name}</h2>
            </header>
            <dl>
              <dt>등급</dt>
              <dd>{member.grade}</dd>
              <dt>진행 상황</dt>
              <dd>{member.progress}</dd>
              <footer>
                <a href={`/progress?member=${member.id}`}>
                  <button>풀이 보기</button>
                </a>
                <a href={`/certificate?member=${member.id}`}>
                  <button>수료증 보기</button>
                </a>
              </footer>
            </dl>
          </article>
        ))}
      </ul>
      <Footer />
    </main>
  );
}
