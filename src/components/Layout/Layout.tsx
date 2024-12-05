import type { ReactNode } from "react";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
