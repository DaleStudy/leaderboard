import React, { useEffect, useState } from "react";

interface SearchBarProps {
  onSearch: (name: string, cohort: number | null) => void;
  totalCohorts: number;
}

export default function SearchBar({ onSearch, totalCohorts }: SearchBarProps) {
  const [name, setName] = useState<string>("");
  const [cohort, setCohort] = useState<number | null>(null);
  const [debounceTimeout, setDebounceTimeout] = useState<number | null>(null);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setName(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = window.setTimeout(() => {
      onSearch(value, cohort);
    }, 200);

    setDebounceTimeout(timeout);
  };

  const handleCohortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    setCohort(value === "" ? null : Number(value));
    onSearch(name, value === "" ? null : Number(value));
  };

  useEffect(() => {
    if (name === "" && cohort) {
      onSearch(name, cohort);
    }
  }, [name, cohort, onSearch]);

  return (
    <section role="searchbox" aria-label="Search Bar">
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        aria-label="이름 검색"
        placeholder="검색"
      />

      <select
        value={cohort ?? ""}
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
