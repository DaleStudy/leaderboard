import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";

import { getMembers } from "../../api/services/store/storeService";
import useMembers, { type Filter } from "../../hooks/useMembers";
import Card from "../Card/Card";

import styles from "./Leaderboard.module.css";

export default function Leaderboard() {
  const { members, isLoading, error, totalCohorts, filter, setFilter } =
    useMembers({ getMembers });

  const handleSearch = ({ name, cohort }: Filter): void =>
    setFilter({ name, cohort });

  if (isLoading) return <p>Loading...</p>; // TODO replace with a proper loading component
  if (error) return <p>Error!</p>; // TODO replace with a proper error component

  const sortedMembers = members.sort((a, b) => b.progress - a.progress);

  return (
    <main className={styles.leaderboard}>
      <Header />

      <div className={styles.contentWrapper}>
        <section className={styles.toolbar}>
          <h1>리더보드</h1>
          <SearchBar
            filter={filter}
            onSearch={handleSearch}
            totalCohorts={totalCohorts}
          />
        </section>

        <ul>
          {sortedMembers.map((member) => (
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
      </div>

      <Footer />
    </main>
  );
}
