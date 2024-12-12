import Button from "../Button/Button";

import styles from "./ServerError.module.css";

export default function ServerError() {
  return (
    <section className={styles.serverError}>
      <h2>Error</h2>
      <p>
        오류가 발생했습니다. 문제가 지속된다면 아래 Github Issue를 방문하여{" "}
        <br />
        문제를 보고하거나 진행 상황을 확인해 주시면 감사하겠습니다.
      </p>
      <a
        href="https://github.com/DaleStudy/leaderboard/issues"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="secondary">문제 보고하기</Button>
      </a>
    </section>
  );
}
