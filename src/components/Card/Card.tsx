import Seed from "../../assets/Seed.png";
import Sprout from "../../assets/Sprout.png";
import YoungTree from "../../assets/YoungTree.png";
import LargeTree from "../../assets/LargeTree.png";
import { Grade } from "../../api/services/types";
import Link from "../Link/Link";

import styles from "./Card.module.css";

interface CardProps {
  id: string;
  name: string;
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

export default function Card({
  id,
  name,
  currentCohort,
  cohorts,
  grade,
}: CardProps) {
  const cohortString =
    cohorts && cohorts.length > 0 ? cohorts.join(", ") : currentCohort;
  return (
    <article className={styles.item}>
      <img src={imageTable[grade]} alt={`${grade} image`} />
      <section>
        <section aria-label={name}>
          <div>
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.22441 2.63622H2.67578C1.89453 2.38219 0.127148 2.4483 0.127148 4.44738C0.127148 5.17605 0.420117 5.68799 0.810742 5.92459C0.320508 6.48157 0.0880859 6.74432 0.0880859 7.11629C0.0880859 7.38267 0.175391 7.62823 0.4375 7.76553C0.158789 8.09028 0 8.32615 0 8.76931C0 9.54691 0.547851 10 1.98496 10C3.3668 10 4.16836 9.3602 4.16836 8.22783C4.16836 6.80728 3.28633 6.85959 1.20684 6.70218L1.46914 6.18032C2.00176 6.36388 3.7875 6.42248 3.7875 4.53625C3.7875 4.0834 3.63652 3.76834 3.49453 3.54168L4.2252 3.4729L4.22441 2.63622ZM2.98574 8.49421C2.98574 9.2706 0.937109 9.27156 0.937109 8.55306C0.937109 8.35594 1.04004 8.18981 1.14355 8.03143C2.66133 8.15978 2.98574 8.11304 2.98574 8.49421ZM1.99336 5.23514C0.962109 5.23514 1.00781 3.51189 2.0168 3.51189C2.98438 3.51189 3.00938 5.23514 1.99336 5.23514ZM4.59688 7.66915V6.8918C5.11934 6.80317 5.12891 6.84337 5.12891 6.62542V3.73129C5.12891 3.52545 5.08887 3.55257 4.59688 3.33753L4.68418 2.54032H6.32812V6.6259C6.32812 6.78355 6.33594 6.80317 6.45527 6.82302L6.86016 6.8918V7.66915H4.59688ZM5.62129 1.7528C5.16875 1.7528 4.90664 1.42757 4.90664 0.866228C4.90664 0.304887 5.16875 0 5.62129 0C6.08184 0 6.34395 0.305614 6.34395 0.866228C6.34395 1.42684 6.08184 1.7528 5.62129 1.7528ZM10 7.2875C9.6584 7.49407 9.1582 7.68126 8.70547 7.68126C7.76055 7.68126 7.40332 7.20904 7.40332 6.09604V3.51673C7.40332 3.38548 7.42383 3.41841 6.78398 3.41841V2.54202C7.48281 2.44345 7.76055 2.00925 7.84785 0.937182H8.60234C8.60234 2.53136 8.57617 2.43401 8.66602 2.43401H9.78516V3.41841H8.60234V5.77106C8.60234 5.93863 8.50625 7.01603 9.78535 6.42103L10 7.2875Z"
                fill="white"
              />
            </svg>
          </div>
          <span>{name}</span>
        </section>
        <section aria-label={`${cohortString}기`}>
          <div>
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.77708 1.92935C5.71385 1.92935 4.83573 1.24999 3.49897 1.24999C3.00383 1.24999 2.5603 1.33562 2.14887 1.48462C2.20589 1.33804 2.23016 1.18108 2.22002 1.02443C2.18486 0.469036 1.72234 0.0235478 1.1575 0.00093062C0.522718 -0.0244991 0 0.474525 0 1.09374C0 1.46535 0.188433 1.79345 0.476191 1.99111V9.53125C0.476191 9.79014 0.689385 10 0.952381 10H1.26984C1.53284 10 1.74603 9.79014 1.74603 9.53125V7.6875C2.30776 7.45187 3.00758 7.25543 4.01657 7.25543C5.07982 7.25543 5.95792 7.93478 7.29468 7.93478C8.25042 7.93478 9.01427 7.61654 9.72534 7.13678C9.89762 7.02055 10 6.82756 10 6.62197V1.87392C10 1.41703 9.51847 1.11474 9.09752 1.3072C8.41621 1.61869 7.58058 1.92935 6.77708 1.92935Z"
                fill="white"
              />
            </svg>
          </div>
          <span>{cohortString}기</span>
        </section>
        <section className={styles.link} aria-label={`card-navigation-${id}`}>
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
