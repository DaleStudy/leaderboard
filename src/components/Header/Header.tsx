import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.headerWrapper}>
      <header>
        <a
          href="http://www.dalestudy.com"
          aria-label="Go to the homepage"
          className={styles.logoLink}
        >
          <img src="/logo-icon.png" alt="로고 아이콘"></img>
          <span>달레 스터디</span>
        </a>
      </header>
    </div>
  );
}
