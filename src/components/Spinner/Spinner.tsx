import { HTMLAttributes } from "react";
import styles from "./Spinner.module.css";

export default function Spinner({
  className,
  ...props
}: HTMLAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      role="status"
      aria-label="spinner"
      className={`${styles.spinner} ${className}`}
      width="137"
      height="138"
      viewBox="0 0 137 138"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="106.497"
        cy="109.183"
        r="12.5"
        transform="rotate(45 106.497 109.183)"
        fill="#24EACA"
        fillOpacity="0.4"
      />
      <circle
        cx="65.9243"
        cy="125.383"
        r="12.5"
        transform="rotate(90 65.9243 125.383)"
        fill="#24EACA"
        fillOpacity="0.6"
      />
      <circle
        cx="107.561"
        cy="28.5789"
        r="12.5"
        transform="rotate(45 107.561 28.5789)"
        fill="#846DE9"
        fillOpacity="0.8"
      />
      <circle
        cx="123.673"
        cy="69.1395"
        r="12.5"
        transform="rotate(90 123.673 69.1395)"
        fill="#846DE9"
      />
      <circle
        cx="28.3535"
        cy="28.9484"
        r="12.5"
        transform="rotate(45 28.3535 28.9484)"
        fill="#846DE9"
        fillOpacity="0.4"
      />
      <circle
        cx="67.4033"
        cy="13.3933"
        r="12.5"
        transform="rotate(90 67.4033 13.3933)"
        fill="#846DE9"
        fillOpacity="0.6"
      />
      <circle
        cx="28.043"
        cy="106.026"
        r="12.5"
        transform="rotate(45 28.043 106.026)"
        fill="#24EACA"
        fillOpacity="0.8"
      />
      <circle
        cx="12.6807"
        cy="67.6741"
        r="12.5"
        transform="rotate(90 12.6807 67.6741)"
        fill="#24EACA"
      />
    </svg>
  );
}
