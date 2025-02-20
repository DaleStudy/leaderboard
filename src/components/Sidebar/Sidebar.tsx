import { useEffect, useRef } from "react";
import type { Grade } from "../../api/services/types";
import Github from "../../assets/Github.png";
import GradeImage from "../GradeImage/GradeImage";
import styles from "./Sidebar.module.css";
import Link from "../Link/Link";

interface SidebarErrorProps {
  isError: true;
}

interface SidebarNormalProps {
  isError?: false; // optional or explicitly false
  githubUsername: string;
  easyProgress: string;
  mediumProgress: string;
  hardProgress: string;
  solvedProblems: number;
  totalProblems: number;
  profileUrl: string;
  cohorts: number[];
  grade: Grade;
}

type SidebarProps = SidebarErrorProps | SidebarNormalProps;

export default function Sidebar(props: SidebarProps) {
  const progressContainerRef = useRef<HTMLDivElement>(null);
  const progressPercent = props.isError
    ? 0
    : Math.min((props.solvedProblems / props.totalProblems) * 100, 100);

  useEffect(() => {
    if (progressContainerRef.current) {
      progressContainerRef.current.style.setProperty(
        "--progress",
        `${progressPercent}%`,
      );
    }
  }, [progressPercent]);

  if (props.isError) {
    return (
      <div className={styles.sidebar}>
        <div className={`${styles.container} ${styles.error}`}></div>
      </div>
    );
  }

  const {
    githubUsername,
    easyProgress,
    mediumProgress,
    hardProgress,
    solvedProblems,
    profileUrl,
    cohorts,
    grade,
  } = props;

  const taskProgress = [
    { label: "EASY", progress: easyProgress, className: styles.easy },
    { label: "MEDIUM", progress: mediumProgress, className: styles.medium },
    { label: "HARD", progress: hardProgress, className: styles.hard },
  ];
  const cohortString = cohorts.join(", ");

  return (
    <div className={styles.sidebar}>
      <div className={styles.container} ref={progressContainerRef}>
        <span className={styles.cohort}>{cohortString}기</span>
        <section className={styles.profile}>
          <div className={styles.avatar}>
            <div className={styles["progress-circle"]}></div>
            <img src={profileUrl} alt="User's profile picture" />
          </div>
          <div>
            <span className={styles.gradientText}>{solvedProblems} </span>
            <span className={styles.solidText}> 문제</span>
          </div>
          <div className={styles.problemLinkWrapper}>
            <Link
              variant="primaryButton"
              href={`https://github.com/DaleStudy/leetcode-study/pulls?q=is%3Apr+author%3A${githubUsername}`}
            >
              풀이 보기
            </Link>
          </div>
          <div className={styles.githubLinkWrapper}>
            <Link href={`https://github.com/${githubUsername}`}>
              <img src={Github} alt="github"></img> {githubUsername}
            </Link>
          </div>
        </section>

        <section className={styles.currentStatus}>
          <GradeImage grade={grade} width={80} height={103} />
        </section>
        <section className={styles.taskCounts}>
          {taskProgress.map(({ label, progress, className }) => (
            <div key={label} className={styles.task}>
              <span className={className}>{label}</span>
              <span className={styles.progress}>{progress}</span>
            </div>
          ))}
        </section>
      </div>
      <div className={styles.returnLinkWrapper}>
        <Link variant="secondaryButton" href="/">
          리더보드로 돌아가기
        </Link>
      </div>
    </div>
  );
}
