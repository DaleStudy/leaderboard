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
          <svg
            id="logo"
            width="45"
            height="22"
            viewBox="0 0 45 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.84 19.03L0.29 12.61V10.51L14.84 3.25V6.76L4.82 11.41L14.84 15.52V19.03ZM28.408 0.579999L20.428 22H16.378L24.358 0.579999H28.408ZM29.8505 15.52L39.8705 11.41L29.8505 6.76V3.25L44.4005 10.51V12.61L29.8505 19.03V15.52Z"
              fill="url(#paint0_linear_278_133)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_278_133"
                x1="-1"
                y1="9.51219"
                x2="46"
                y2="9.51219"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#24FACA" />
                <stop offset="1" stopColor="#846DE9" />
              </linearGradient>
            </defs>
          </svg>
          <span>달레 스터디</span>
        </a>
      </header>
    </div>
  );
}
