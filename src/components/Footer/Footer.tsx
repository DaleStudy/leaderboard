import styles from "./Footer.module.css";

export default function Footer() {
  const leftMenu = [
    {
      label: "FAQ",
      link: "https://github.com/DaleStudy/leetcode-study/discussions",
    },
    {
      label: "Apply",
      link: "https://github.com/DaleStudy/leetcode-study/discussions/209",
    },
    {
      label: "Guide",
      link: "https://github.com/DaleStudy/leetcode-study/blob/main/CONTRIBUTING.md",
    },
  ];

  const rightMenu = [
    {
      label: "Blog",
      component: <img src="/blog-icon.svg" alt="블로그 아이콘"></img>,
      link: "https://www.algodale.com",
    },
    {
      label: "LinkedIn",
      component: <img src="/linked-in-icon.svg" alt="링크드인 아이콘"></img>,
      link: "https://www.linkedin.com/in/daleseo",
    },
    {
      label: "Github",
      component: (
        <img src="/github-icon-in-footer.svg" alt="깃허브 아이콘"></img>
      ),
      link: "https://github.com/DaleStudy/leetcode-study",
    },
    {
      label: "Youtube",
      component: <img src="/youtube-icon.svg" alt="유튜브 아이콘"></img>,
      link: "https://www.youtube.com/@DaleSeo",
    },
  ];

  return (
    <footer className={styles.footer} aria-label="Site Footer">
      <section>
        <ul className={styles.leftMenu}>
          {leftMenu.map(({ label, link }) => (
            <li key={link}>
              <a href={link} target="_blank" aria-label={label}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <ul className={styles.rightMenu}>
          {rightMenu.map(({ label, link, component }) => (
            <li key={link}>
              <a href={link} target="_blank" aria-label={label}>
                {component}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <p>© 2024 DaleStudy. All rights reserved.</p>
    </footer>
  );
}
