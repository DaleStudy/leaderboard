import React, { useEffect, useState } from "react";

import type { Filter } from "../../hooks/useMembers";

import style from "./SearchBar.module.css";

interface SearchBarProps {
  filter: Filter;
  onSearch: (name: string, cohort: number | null) => void;
  totalCohorts: number;
}

export default function SearchBar({
  filter,
  onSearch,
  totalCohorts,
}: SearchBarProps) {
  const [debounceTimeout, setDebounceTimeout] = useState<number | null>(null);
  const [localName, setLocalName] = useState<string>(filter.name);

  useEffect(() => {
    setLocalName(filter.name);
  }, [filter.name]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalName(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = window.setTimeout(() => {
      onSearch(value.trim(), filter.cohort);
    }, 200);

    setDebounceTimeout(timeout);
  };

  const handleCohortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    onSearch(filter.name, value === "" ? null : Number(value));
  };

  return (
    <section
      role="searchbox"
      aria-label="Search Bar"
      className={style.searchBar}
    >
      <img src="/search-icon.svg" alt="검색 아이콘" />

      <input
        type="text"
        value={localName}
        onChange={handleNameChange}
        aria-label="이름 검색"
        placeholder="검색"
      />

      <div className={style.separator}></div>

      <select
        value={filter.cohort ?? ""}
        onChange={handleCohortChange}
        aria-label="기수 선택"
      >
        <option value="">기수</option>
        {[...Array(totalCohorts)].map((_, index) => (
          <option key={index} value={index + 1}>
            {index + 1}기
          </option>
        ))}
      </select>
    </section>
  );
}
