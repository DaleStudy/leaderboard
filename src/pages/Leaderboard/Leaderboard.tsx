import { useRef } from "react";
import { getMembers } from "../../api/getMembers";
import useMembers, { type Filter } from "../../hooks/useMembers";
import usePagination from "../../hooks/usePagination";
import Layout from "../../components/Layout/Layout";
import SearchBar from "../../components/SearchBar/SearchBar";
import ServerError from "../../components/ServerError/ServerError";
import Spinner from "../../components/Spinner/Spinner";
import Pagination from "../../components/Pagination/Pagination";
import Meta from "../../components/Meta/Meta";
import styles from "./Leaderboard.module.css";
import { Flex, HStack, Heading, VStack } from "daleui";
import GradeImage from "../../components/GradeImage/GradeImage";
import type { Grade } from "../../api/services/types";
import Card from "../../components/Card/Card";

const grades: { grade: Grade; name: string; value: number }[] = [
  {
    grade: "SEED",
    name: "씨앗",
    value: 0,
  },
  {
    grade: "SPROUT",
    name: "새싹",
    value: 15,
  },
  {
    grade: "LEAF",
    name: "잎새",
    value: 30,
  },
  {
    grade: "BRANCH",
    name: "가지",
    value: 45,
  },
  {
    grade: "FRUIT",
    name: "열매",
    value: 60,
  },
  {
    grade: "TREE",
    name: "나무",
    value: 70,
  },
];

export default function Leaderboard() {
  const {
    members: rawMembers,
    isLoading,
    error,
    totalCohorts,
    filter,
    setFilter,
  } = useMembers({ getMembers });
  const {
    currentPage,
    goPrevious,
    goNext,
    totalPages,
    items: members,
  } = usePagination({
    totalItems: rawMembers,
  });
  const headingRef = useRef<HTMLHeadingElement>(null);

  const handleSearch = ({ name, cohort }: Filter): void =>
    setFilter({ name, cohort });
  const scrollToHeading = () => {
    if (headingRef.current && window.innerWidth <= 1100) {
      headingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  return (
    <Layout>
      <Meta
        title="달레 스터디 리더보드"
        description="달레 스터디 리더보드 페이지입니다."
        url={window.location.href}
      />

      <main className={styles.leaderboard}>
        <Flex className={styles.leaderboardHeader}>
          <Flex
            as="section"
            direction="column"
            gap="8"
            className={styles.flex1}
          >
            <div ref={headingRef}>
              <Heading level={2}>리더보드 찾기</Heading>
            </div>
            <SearchBar
              filter={filter}
              onSearch={handleSearch}
              totalCohorts={totalCohorts}
            />
          </Flex>

          <Flex
            as="section"
            direction="column"
            gap="8"
            className={styles.flex1}
          >
            <Heading level={2}>등급 기준표</Heading>
            <HStack className={styles.grades}>
              {grades.map((grade) => (
                <VStack key={grade.grade}>
                  <GradeImage
                    key={grade.grade}
                    grade={grade.grade}
                    height={40}
                    width={40}
                  />
                  <p>{grade.value}+</p>
                </VStack>
              ))}
            </HStack>
          </Flex>
        </Flex>
        <div className={styles.contentWrapper}>
          {error ? (
            <div className={styles.serverErrorWrapper}>
              <ServerError />
            </div>
          ) : (
            <>
              <ul>
                {members.map((member) => (
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

              <div className={styles.paginationWrapper}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onClickPrevious={() => {
                    scrollToHeading();
                    goPrevious();
                  }}
                  onClickNext={() => {
                    scrollToHeading();
                    goNext();
                  }}
                />
              </div>
            </>
          )}
        </div>
      </main>
    </Layout>
  );
}
