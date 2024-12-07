import Link from "../Link/Link";

import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <section className={styles.error}>
      <h1>Page Not Found</h1>
      <p>{`요청하신 페이지를 찾을 수 없습니다.\n아래 버튼을 눌러 리더보드로 돌아가 주세요.`}</p>
      <Link variant="secondaryButton" href="/">
        리더보드로 돌아가기
      </Link>
    </section>
  );
}
