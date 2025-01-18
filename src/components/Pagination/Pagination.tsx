import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onClickPrevious: () => void;
  onClickNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onClickPrevious,
  onClickNext,
}) => {
  return (
    <nav
      className={styles.container}
      role="navigation"
      aria-label="Pagination Navigation"
    >
      <button
        className={styles.button}
        onClick={onClickPrevious}
        disabled={currentPage === 1}
        aria-disabled={currentPage === 1}
        aria-label="이전 페이지로 이동"
      >
        &lt;
      </button>

      <p
        className={styles.pageInfo}
        aria-label={`Page ${currentPage} of ${totalPages}`}
      >
        <span aria-label="현재 페이지" className={styles.currentPage}>
          {currentPage}
        </span>
        <span className={styles.divider}>/</span>
        <span>{totalPages}</span>
      </p>

      <button
        className={styles.button}
        onClick={onClickNext}
        disabled={currentPage === totalPages}
        aria-disabled={currentPage === totalPages}
        aria-label="다음 페이지로 이동"
      >
        &gt;
      </button>
    </nav>
  );
};

export default Pagination;
