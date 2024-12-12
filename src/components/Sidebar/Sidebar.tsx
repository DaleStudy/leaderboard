import { useEffect, useRef } from "react";
import styles from "./Sidebar.module.css";
import Seed from "../../assets/Seed.png";
import Sprout from "../../assets/Sprout.png";
import YoungTree from "../../assets/YoungTree.png";
import LargeTree from "../../assets/LargeTree.png";
import Github from "../../assets/Github.png";
import { Grade } from "../../api/services/types";

interface SidebarProps {
  githubUsername: string;
  easyProgress: string;
  mediumProgress: string;
  hardProgress: string;
  solvedProblems: number;
  totalProblems: number;
  profileUrl: string;
  currentCohort: number;
  cohorts: number[];
  grade: Grade;
}

const imageTable = {
  SEED: Seed,
  SPROUT: Sprout,
  LEAF: Sprout,
  BRANCH: Sprout,
  FRUIT: YoungTree,
  TREE: LargeTree,
};

export default function Sidebar({
  githubUsername,
  easyProgress,
  mediumProgress,
  hardProgress,
  solvedProblems,
  totalProblems,
  profileUrl,
  currentCohort,
  cohorts,
  grade,
}: SidebarProps) {
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const progressPercent = Math.min((solvedProblems / totalProblems) * 100, 100);

  useEffect(() => {
    if (progressContainerRef.current) {
      progressContainerRef.current.style.setProperty(
        "--progress",
        `${progressPercent}%`,
      );
    }
  }, [progressPercent]);

  const taskProgress = [
    { label: "EASY", progress: easyProgress, className: styles.easy },
    { label: "MEDIUM", progress: mediumProgress, className: styles.medium },
    { label: "HARD", progress: hardProgress, className: styles.hard },
  ];
  const cohortString =
    cohorts && cohorts.length > 0 ? cohorts.join(", ") : currentCohort;

  return (
    <aside>
      <div className={styles.container} ref={progressContainerRef}>
        <span className={styles.currentCohort}>{cohortString}기</span>
        <section className={styles.profile}>
          <div className={styles.avatar}>
            <div className={styles["progress-circle"]}></div>
            <img src={profileUrl} alt="User's profile picture" />
          </div>
          <div>
            <span className={styles.gradientText}>{solvedProblems} </span>
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
