import { useRef } from "react";
import type { HTMLAttributes, MouseEvent, PropsWithChildren } from "react";

import styles from "./Button.module.css";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
  block?: boolean;
  size?: "small" | "large";
  delay?: number;
}

export default function Button({
  variant = "primary",
  block = false,
  size = "small",
  delay = 0,
  children,
  onClick,
  ...props
}: PropsWithChildren<ButtonProps>) {
  const schedule = useRef<NodeJS.Timer>();

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    clearTimeout(schedule.current);
    schedule.current = setTimeout(() => {
      if (onClick) onClick(e);
    }, delay);
  };

  return (
    <button
      {...props}
      className={`${styles.default} ${styles[variant]} ${block ? styles.block : ""} ${styles[size]}`}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
}
