import { Box, Link, Flex, HStack, Icon } from "daleui";
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
    <Box as="footer" className={styles.footer}>
      <Flex className={styles.footerTop} align="end" justify="between">
        <Flex direction="column" gap="16" align="start">
          <span className={styles.footerTopLabel}>바로가기</span>
          <HStack gap="40" className={styles.footerTopLeftMenu}>
            {leftMenu.map(({ label, link }) => (
              <Link
                key={label}
                href={link}
                target="_blank"
                aria-label={label}
                external
              >
                {label}
                <Icon name="externalLink" size="md" />
              </Link>
            ))}
          </HStack>
        </Flex>
        <HStack gap="32" className={styles.footerTopRightMenu}>
          {rightMenu.map(({ label, link, component }) => (
            <Link
              key={label}
              href={link}
              target="_blank"
              aria-label={label}
              external
            >
              {component}
            </Link>
          ))}
        </HStack>
      </Flex>
      <HStack align="between" className={styles.footerBottom}>
        <span>© 2024 DaleStudy. All rights reserved.</span>
        <Icon name="sun" />
      </HStack>
    </Box>
  );
}
