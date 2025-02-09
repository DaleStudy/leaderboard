import { useEffect, useState } from "react";

type UsePagination = <Data>(params: {
  totalItems: Data[];
  pageSize?: number;
}) => {
  currentPage: number;
  totalPages: number;
  items: Data[];
  goNext: () => void;
  goPrevious: () => void;
};

const usePagination: UsePagination = ({ totalItems, pageSize = 8 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems.length / pageSize);

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const items = totalItems.slice(start, end);

  const goNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goPrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [totalItems]);

  return {
    currentPage,
    totalPages,
    items,
    goNext,
    goPrevious,
  };
};

export default usePagination;
