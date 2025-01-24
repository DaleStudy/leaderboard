import Link from "../Link/Link";

import styles from "./Unqualified.module.css";

export default function Unqualified() {
  return (
    <section className={styles.unqualified}>
      <h1>YOU CAN DO IT 💪</h1>
      <p>
        조금씩 자라나고 있어요, 곧 멋진 나무가 될 거예요!
        <br />
        가지 이상 등급 달성 후 수료증 발급이 가능합니다.
      </p>
      <Link variant="secondaryButton" href="/">
        리더보드로 돌아가기
      </Link>
    </section>
  );
}
