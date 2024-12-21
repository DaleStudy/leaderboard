import ServerError from "../ServerError/ServerError";
import styles from "./Table.module.css";

interface Problem {
  id: number;
  title: string;
  difficulty: string;
}

interface TableProps {
  problems: Problem[];
  solvedProblems: Problem[];
  isError?: boolean;
}

export function Table({
  problems,
  solvedProblems,
  isError = false,
}: TableProps) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.problemHeading} scope="col" aria-label="문제명">
            Problem
          </th>
          <th
            className={styles.difficultyHeading}
            scope="col"
            aria-label="난이도"
          >
            Difficulty
          </th>
          <th
            className={styles.statusHeading}
            scope="col"
            aria-label="문제 완료 상태"
          >
            Status
          </th>
        </tr>
      </thead>
      {isError ? (
        <tbody className={styles.serverErrorWrapper}>
          <tr>
            <td colSpan={3}>
              <ServerError />
            </td>
          </tr>
        </tbody>
      ) : (
        <tbody>
          {problems.map((problem) => {
            const isCompleted = solvedProblems.some(
              (solved) => solved.id === problem.id,
            );
            const problemIcon = getTaskIcon(isCompleted);
            const difficultyClass = getDifficultyClass(problem.difficulty);

            const formattedTitle = problem.title.replace(/-/g, " ");

            // Add a period to "Med" only
            const difficultyLabel =
              problem.difficulty === "Med"
                ? `${problem.difficulty}.`
                : problem.difficulty;

            return (
              <tr key={problem.id}>
                <td className={styles.problemData}>
                  {problem.id}. {formattedTitle}
                </td>
                <td className={`${styles.difficultyData} ${difficultyClass}`}>
                  {difficultyLabel}
                </td>
                <td
                  className={styles.statusData}
                  aria-label={isCompleted ? "완료" : "미완료"}
                >
                  {problemIcon}
                </td>
              </tr>
            );
          })}
        </tbody>
      )}
    </table>
  );
}

function getTaskIcon(completed: boolean) {
  if (completed) {
    return (
      <img
        src="/completed-status-icon.svg"
        alt="완료 문제 상태 아이콘"
        aria-label="완료 문제"
      ></img>
    );
  } else {
    return (
      <img
        src="/incomplete-status-icon.svg"
        alt="미완료 문제 상태 아이콘"
        aria-label="미완료 문제"
        style={{ opacity: 0.4 }}
      />
    );
  }
}

function getDifficultyClass(difficulty: string) {
  if (difficulty === "Easy") {
    return styles.easy;
  } else if (difficulty === "Med") {
    return styles.medium;
  } else {
    return styles.hard;
  }
}
