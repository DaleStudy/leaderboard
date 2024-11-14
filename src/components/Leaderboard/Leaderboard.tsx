import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import { getMembers } from "../../api/services/store/storeService";
import useMembers from "../../hooks/useMembers";

import styles from "./Leaderboard.module.css";
export default function Leaderboard() {
  const { members, isLoading, error } = useMembers({ getMembers });
  console.log({ members, isLoading, error });

  const mockMembers = [
    { name: "DaleSeo", solved: 71, rank: "새싹" },
    { name: "sounmind", solved: 69, rank: "나무" },
    { name: "yolophg", solved: 65, rank: "새싹" },
    { name: "Sunjae95", solved: 63, rank: "나무" },
    { name: "HC-kang", solved: 62, rank: "나무" },
    { name: "SamTheKorean", solved: 60, rank: "나무" },
  ];

  return (
    <main className={styles.leaderboard}>
      <Header />
      <h1>Leaderboard </h1>

      <article aria-labelledby="leaderboard">
        <h2 id="leaderboard">Members List</h2>
        <ul>
          {mockMembers.map((member) => (
            <li key={member.name}>
              <div>등급: {member.rank}</div>
              <div>진행 상황: {member.solved}</div>
              <div>
                <a href={`/progress?member=${member.name}`}>
                  <button>풀이 보기</button>
                </a>
                <a href={`/certificate?member=${member.name}`}>
                  <button>수료증 보기</button>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </article>
      <Footer />
    </main>
  );
}
