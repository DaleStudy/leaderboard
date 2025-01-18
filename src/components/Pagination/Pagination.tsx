import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav
      className={styles.container}
      role="navigation"
      aria-label="Pagination Navigation"
    >
      <button
        className={`${styles.button} ${
          currentPage === 1 ? styles.disabledButton : ""
        }`}
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        aria-disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        &lt;
      </button>
      <span
        className={styles.pageInfo}
        aria-label={`Page ${currentPage} of ${totalPages}`}
      >
        <span aria-current="page">{currentPage}</span> / {totalPages}
      </span>
      <button
        className={`${styles.button} ${
          currentPage === totalPages ? styles.disabledButton : ""
        }`}
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        aria-disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        &gt;
      </button>
    </nav>
  );
};

export default Pagination;
