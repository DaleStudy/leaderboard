import { useCallback, useState } from "react";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";

import { getMembers } from "../../api/services/store/storeService";
import useMembers from "../../hooks/useMembers";
import Card from "../Card/Card";

import styles from "./Leaderboard.module.css";

export default function Leaderboard() {
  const { members, isLoading, error } = useMembers({ getMembers });
  const [criteria, setCriteria] = useState<{
    name: string;
    cohort: number | null;
  }>({ name: "", cohort: null });

  const totalCohorts = new Set(members.map((member) => member.cohort)).size;
  const handleSearch = useCallback(
    (name: string, cohort: number | null): void =>
      setCriteria({ name, cohort }),
    [],
  );

  if (isLoading) return <p>Loading...</p>; // TODO replace with a proper loading component
  if (error) return <p>Error!</p>; // TODO replace with a proper error component

  const processedMembers = members
    .filter((member) => member.name.includes(criteria.name))
    .filter(
      (member) => criteria.cohort === null || member.cohort === criteria.cohort,
    )
    .sort((memberA, memberB) => memberB.progress - memberA.progress);

  return (
    <main className={styles.leaderboard}>
      <Header />

      <section className={styles.toolbar}>
        <h1>리더보드</h1>
        <SearchBar onSearch={handleSearch} totalCohorts={totalCohorts} />
      </section>

      <ul>
        {processedMembers.map((member) => (
          <li key={member.id}>
            <Card
              id={member.id}
              name={member.name}
              cohort={member.cohort}
              grade={member.grade}
            />
          </li>
        ))}
      </ul>

      <Footer />
    </main>
  );
}
