import type {
  HTMLAttributes,
  AnchorHTMLAttributes,
  PropsWithChildren,
} from "react";

import styles from "./Link.module.css";

interface LinkProps
  extends HTMLAttributes<HTMLAnchorElement>,
    AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "text" | "primaryButton" | "secondaryButton";
}

export default function Link({
  variant = "text",
  className,
  children,
  ...props
}: PropsWithChildren<LinkProps>) {
  return (
    <a
      {...props}
      className={`${styles.default} ${styles[variant]} ${className ?? ""}`}
    >
      {children}
    </a>
  );
}
