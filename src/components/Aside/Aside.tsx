import { useEffect } from "react";
import styles from "./Aside.module.css";
import Seed from "../../assets/Seed.png";
import Sprout from "../../assets/Sprout.png";
import YoungTree from "../../assets/YoungTree.png";
import LargeTree from "../../assets/LargeTree.png";
import Github from "../../assets/Github.png";
import { Grade } from "../../api/services/common/types.ts";

interface AsideProps {
  githubUsername: string;
  easyProgress: string;
  mediumProgress: string;
  hardProgress: string;
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
  easyProgress,
  mediumProgress,
  hardProgress,
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

  const taskProgress = [
    { label: "EASY", progress: easyProgress, className: styles.easy },
    { label: "MEDIUM", progress: mediumProgress, className: styles.medium },
    { label: "HARD", progress: hardProgress, className: styles.hard },
  ];

  return (
    <aside>
      <div className={styles.container}>
        <span className={styles.cohort}>{cohort}기</span>
        <section className={styles.profile}>
          <div className={styles.avatar}>
            <div className={styles["progress-circle"]}></div>
            <img src={profile_url} alt="User's profile picture" />
          </div>
          <div>
            <span className={styles.gradientText}>{solvedTasks} </span>
            <span className={styles.solidText}> 문제</span>
          </div>
          <div className={styles.progress}>
            <a
              className={styles.problemButtonLink}
              href={`https://github.com/DaleStudy/leetcode-study/pulls?q=is%3Apr+author%3A${githubUsername}`}
            >
              풀이 보기
            </a>
          </div>
          <div className={styles.githubLinkWrapper}>
            <a
              className={styles.githubLink}
              href={`https://github.com/${githubUsername}`}
            >
              <img src={Github} alt="github"></img> {githubUsername}
            </a>
          </div>
        </section>

        <section className={styles.currentStatus}>
          <figure>
            <img src={imageTable[grade]} alt={`${grade} 등급`} />
          </figure>
        </section>
        <section className={styles.taskCounts}>
          {taskProgress.map(({ label, progress, className }) => (
            <div key={label} className={styles.task}>
              <span className={className}>{label}</span>
              <span>{progress}</span>
            </div>
          ))}
        </section>
      </div>
      <a href="../" className={styles.returnButtonLink}>
        리더보드로 돌아가기
      </a>
    </aside>
  );
}
