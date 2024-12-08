import { getMembers } from "../../api/getMembers";
import useMembers, { type Filter } from "../../hooks/useMembers";

import Card from "../Card/Card";
import Error500 from "../Error500/Error500";
import Layout from "../Layout/Layout";
import SearchBar from "../SearchBar/SearchBar";
import Spinner from "../Spinner/Spinner";

import styles from "./Leaderboard.module.css";

export default function Leaderboard() {
  const { members, isLoading, error, totalCohorts, filter, setFilter } =
    useMembers({ getMembers });

  const handleSearch = ({ name, cohort }: Filter): void =>
    setFilter({ name, cohort });

  if (isLoading) return <Spinner />; // TODO replace with a proper loading component

  return (
    <Layout>
      <main className={styles.leaderboard}>
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
            {error ? (
              <Error500 />
            ) : (
              members
                .sort((a, b) => b.progress - a.progress)
                .map((member) => (
                  <li key={member.id}>
                    <Card
                      id={member.id}
                      name={member.name}
                      cohort={member.cohort}
                      grade={member.grade}
                    />
                  </li>
                ))
            )}
          </ul>
        </div>
      </main>
    </Layout>
  );
}
