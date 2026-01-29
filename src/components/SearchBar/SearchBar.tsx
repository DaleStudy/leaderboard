import React, { useEffect, useState } from "react";

import type { Filter } from "../../hooks/useMembers";

import style from "./SearchBar.module.css";
import { Box, Flex, Select, TextInput } from "daleui";

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
    <Flex as="section" aria-label="검색 창" gap="8">
      <Box width="8rem" className={style.flexShrink0}>
        <Select
          value={filter.cohort?.toString() ?? ""}
          onChange={handleCohortChange}
          aria-label="기수 선택"
        >
          <option value="">전체 기수</option>
          {[...Array(totalCohorts)].map((_, index) => (
            <option key={index} value={(index + 1).toString()}>
              {index + 1}기
            </option>
          ))}
        </Select>
      </Box>
      <TextInput
        type="search"
        value={localName}
        onChange={handleNameChange}
        aria-label="이름 검색"
        placeholder="검색"
        leadingIcon="search"
      />
    </Flex>
  );
}
