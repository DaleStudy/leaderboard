import { useEffect } from "react";
import styles from "./Aside.module.css";
import Seed from "../../assets/Seed.png";
import Sprout from "../../assets/Sprout.png";
import YoungTree from "../../assets/YoungTree.png";
import LargeTree from "../../assets/LargeTree.png";
import { Grade } from "../../api/services/common/types.ts";

interface AsideProps {
  githubUsername: string;
  easyTasks: string;
  mediumTasks: string;
  hardTasks: string;
  solvedTasks: number;
  totalTasks: number;
  profile_url: string;
  cohort: number;
  grade: Grade;
}

const imageTable = {
  SEED: Seed,
  SPROUT: Sprout,
  SMALL_TREE: YoungTree,
  BIG_TREE: LargeTree,
};

export default function Aside({
  githubUsername,
  easyTasks,
  mediumTasks,
  hardTasks,
  solvedTasks,
  totalTasks,
  profile_url,
  cohort,
  grade,
}: AsideProps) {
  const progressPercent = Math.min((solvedTasks / totalTasks) * 100, 100);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--progress",
      `${progressPercent}%`,
    );
  }, [progressPercent]);

  return (
    <aside>
      <div className={styles.container}>
        <span className={styles.cohort}>{cohort}기</span>
        <section className={styles.profile}>
          <div className={styles.avatar}>
            <div className={styles["progress-circle"]}></div>
            <img src={profile_url} alt="User's profile picture" />
          </div>
          <div className={styles.progress}>
            <a
              href={`https://github.com/DaleStudy/leetcode-study/pulls?q=is%3Apr+author%3A${githubUsername}`}
            >
              풀이 보기
            </a>
          </div>
          <a href={`https://github.com/${githubUsername}`}>
            {" "}
            {githubUsername}{" "}
          </a>
        </section>

        <section className={styles.currentStatus}>
          <figure>
            <img src={imageTable[grade]} alt={`${grade} 등급`} />
          </figure>
        </section>
        <section className={styles.taskCounts}>
          <div className={styles.task}>
            <span className={styles.easy}>EASY</span>
            <span>{easyTasks}</span>
          </div>
          <div className={styles.task}>
            <span className={styles.medium}>MEDIUM</span>
            <span>{mediumTasks}</span>
          </div>
          <div className={styles.task}>
            <span className={styles.hard}>HARD</span>
            <span>{hardTasks}</span>
          </div>
        </section>
      </div>
      <a href="../Leaderboard/Leaderboard.tsx" className={styles.buttonLink}>
        리더보드로 돌아가기
      </a>
    </aside>
  );
}
