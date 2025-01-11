import type { Grade } from "../../api/services/types";
import GradeImage from "../GradeImage/GradeImage";
import Link from "../Link/Link";
import styles from "./Card.module.css";

interface CardProps {
  id: string;
  name: string;
  cohorts: number[];
  grade: Grade;
}

export default function Card({ id, name, cohorts, grade }: CardProps) {
  const cohortString =
    cohorts && cohorts.length > 0 ? cohorts.join(", ") : cohorts.at(-1);
  return (
    <article className={styles.item}>
      <GradeImage grade={grade} width={105} height={128} />

      <section className={styles.content}>
        <div className={styles.nameCohortWrapper}>
          <section aria-label={name}>
            <div className={styles.iconWrapper}>
              <img src="/github-icon-in-card.svg" alt="깃허브 아이콘" />
            </div>
            <span>{name}</span>
          </section>

          <section aria-label={`${cohortString}기`}>
            <div className={styles.iconWrapper}>
              <img src="/flag-icon.svg" alt="깃발 아이콘" />
            </div>
            <span>{cohortString}기</span>
          </section>
        </div>

        <section className={styles.links} aria-label={`카드-네비게이션-${id}`}>
          <Link href={`/progress?member=${id}`} variant="primaryButton">
            풀이 현황
          </Link>
          <Link href={`/certificate?member=${id}`} variant="primaryButton">
            수료증
          </Link>
        </section>
      </section>
    </article>
  );
}
