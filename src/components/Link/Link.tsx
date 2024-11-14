import React from "react";

import styles from "./Link.module.css";

interface LinkProps
  extends React.HTMLAttributes<HTMLAnchorElement>,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "text" | "primaryButton" | "secondaryButton";
}

export default function Link({
  variant = "text",
  className,
  children,
  ...props
}: React.PropsWithChildren<LinkProps>) {
  return (
    <a
      {...props}
      className={`${styles.default} ${styles[variant]} ${className ?? ""}`}
    >
      {children}
    </a>
  );
}
