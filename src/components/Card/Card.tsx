import SeedImage from "../../assets/GradeSeed.png";
import SproutImage from "../../assets/GradeSprout.png";
import LeafImage from "../../assets/GradeLeaf.png";
import BranchImage from "../../assets/GradeBranch.png";
import FruitImage from "../../assets/GradeFruit.png";
import TreeImage from "../../assets/GradeTree.png";
import { Grade } from "../../api/services/types";
import Link from "../Link/Link";

import styles from "./Card.module.css";

interface CardProps {
  id: string;
  name: string;
  currentCohort: number;
  cohorts: number[];
  grade: keyof typeof Grade;
}

const imageTable = {
  SEED: SeedImage,
  SPROUT: SproutImage,
  LEAF: LeafImage,
  BRANCH: BranchImage,
  FRUIT: FruitImage,
  TREE: TreeImage,
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
            <img src="/github-icon-in-card.svg" alt="깃허브 아이콘" />
          </div>
          <span>{name}</span>
        </section>
        <section aria-label={`${cohortString}기`}>
          <div>
            <img src="/flag-icon.svg" alt="깃발 아이콘" />
          </div>
          <span>{cohortString}기</span>
        </section>
        <section className={styles.link} aria-label={`카드-네비게이션-${id}`}>
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
