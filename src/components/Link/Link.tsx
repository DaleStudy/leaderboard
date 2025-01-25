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
  disabled?: boolean;
}

export default function Link({
  variant = "text",
  className,
  children,
  href,
  disabled = false,
  ...props
}: PropsWithChildren<LinkProps>) {
  if (disabled && variant !== "primaryButton") {
    throw new Error(
      "The `disabled` prop is only supported for the primaryButton variant",
    );
  }

  return (
    <a
      {...props}
      href={disabled ? undefined : href}
      className={`${styles.default} ${styles[variant]} ${className ?? ""}`}
    >
      {children}
    </a>
  );
}
