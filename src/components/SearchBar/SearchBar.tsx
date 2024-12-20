import React, { useEffect, useState } from "react";

import type { Filter } from "../../hooks/useMembers";

import style from "./SearchBar.module.css";

interface SearchBarProps {
  filter: Filter;
  onSearch: (filter: Filter) => void;
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
      onSearch({
        name: value.trim(),
        cohort: filter.cohort,
      });
    }, 200);

    setDebounceTimeout(timeout);
  };

  const handleCohortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    onSearch({
      name: filter.name,
      cohort: value ? parseInt(value) : null,
    });
  };

  return (
    <section aria-label="검색 창" className={style.searchBar}>
      <img src="/search-icon.svg" alt="검색 아이콘" />

      <input
        type="search"
        value={localName}
        onChange={handleNameChange}
        aria-label="이름 검색"
        placeholder="검색"
      />

      <div role="separator" className="separator"></div>

      <select
        value={filter.cohort ?? ""}
        onChange={handleCohortChange}
        aria-label="기수 선택"
      >
        <option value="">전체 기수</option>
        {[...Array(totalCohorts)].map((_, index) => (
          <option key={index} value={index + 1}>
            {index + 1}기
          </option>
        ))}
      </select>
    </section>
  );
}
