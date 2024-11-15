import React, { useEffect } from "react";
import styles from "./Aside.module.css";

interface AsideProps {
  githubUsername: string;
  easyTasks: string;
  mediumTasks: string;
  hardTasks: string;
  solvedTasks: number;
  totalTasks: number;
}

export default function Aside({
  githubUsername,
  easyTasks,
  mediumTasks,
  hardTasks,
  solvedTasks,
  totalTasks,
}: AsideProps) {
  const progressPercent = Math.min((solvedTasks / totalTasks) * 100, 100);

  // Apply a CSS class based on progress percent
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--progress",
      `${progressPercent}%`
    );
  }, [progressPercent]);

  return (
    <aside className={styles.container}>
      <section className={styles.profile}>
        <div className={styles.avatar}>
          <div className={styles["progress-circle"]}></div>
          <img src="path_to_avatar_image" alt="User's profile picture" />
        </div>
        <div className={styles.progress}>
          <span>{solvedTasks} 문제</span>
          <div>PR 리스트</div>
        </div>
        <p className={styles.username}>{githubUsername}</p>
      </section>

      <section className={styles.currentStatus}>
        <figure>
          <img src="path_to_current_status_image" alt="현재 상태 아이콘" />
          <figcaption>새싹</figcaption>
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

      <button className={styles.returnButton}>리스트로 돌아가기</button>
    </aside>
  );
}
