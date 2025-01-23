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
        <Spinner />
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

          <section className={styles.gradeCriteria}>
            <img src="/information-icon.svg" alt="등급 안내 문구" />
            등급 기준(문제 수) : 나무(70+), 열매(60+), 가지(45+), 잎새(30+),
            새싹(15+), 씨앗(0+)
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
