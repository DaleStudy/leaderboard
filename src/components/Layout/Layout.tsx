import styles from "./Layout.module.css";
import type { ReactNode } from "react";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Box } from "daleui";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box className={styles.container}>
      <Box className={styles.main}>
        <Header />
        {children}
        <Footer />
      </Box>
    </Box>
  );
}
