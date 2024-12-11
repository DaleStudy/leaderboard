import { getMembers } from "../../api/getMembers";
import useMembers, { type Filter } from "../../hooks/useMembers";

import Card from "../../components/Card/Card";
import Layout from "../../components/Layout/Layout";
import SearchBar from "../../components/SearchBar/SearchBar";
import ServerError from "../../components/ServerError/ServerError";
import Spinner from "../../components/Spinner/Spinner";

import styles from "./Leaderboard.module.css";

export default function Leaderboard() {
  const { members, isLoading, error, totalCohorts, filter, setFilter } =
    useMembers({ getMembers });

  const handleSearch = ({ name, cohort }: Filter): void =>
    setFilter({ name, cohort });

  if (isLoading) {
    return (
      <Layout>
        <main className={styles.loading}>
          <Spinner />
        </main>
      </Layout>
    );
  }

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

          {error ? (
            <div className={styles.serverErrorWrapper}>
              <ServerError />
            </div>
          ) : (
            <ul>
              {members
                .sort((a, b) => b.progress - a.progress)
                .map((member) => (
                  <li key={member.id}>
                    <Card
                      id={member.id}
                      name={member.name}
                      currentCohort={member.currentCohort}
                      cohorts={member.cohorts}
                      grade={member.grade}
                    />
                  </li>
                ))}
            </ul>
          )}
        </div>
      </main>
    </Layout>
  );
}
