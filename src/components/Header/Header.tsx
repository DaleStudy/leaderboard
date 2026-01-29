import { Box, HStack, Heading, Link } from "daleui";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <Box as="header" padding="16" className={styles.header}>
      <Link href="/" aria-label="리더보드로 이동">
        <HStack gap="32">
          <img src="/logo-icon.svg" alt="로고 아이콘"></img>
          <Heading level={3} tone="neutral">
            달레 스터디 리더보드
          </Heading>
        </HStack>
      </Link>
    </Box>
  );
}
