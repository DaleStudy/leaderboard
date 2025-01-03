import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.headerWrapper}>
      <div>
        <a
          href="http://www.dalestudy.com"
          aria-label="홈페이지로 이동"
          className={styles.logoLink}
        >
          <img src="/logo-icon.svg" alt="로고 아이콘"></img>
          <span>달레 스터디</span>
        </a>
      </div>
    </header>
  );
}
