import styles from "./Table.module.css";

interface Problem {
  id: number;
  title: string;
  difficulty: string;
}

interface TableProps {
  problems: Problem[];
  solvedProblems: Problem[];
}

export function Table({ problems, solvedProblems }: TableProps) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th
            className={styles.problemHeading}
            scope="col"
            aria-label="Problem Title"
          >
            Problem
          </th>
          <th
            className={styles.difficultyHeading}
            scope="col"
            aria-label="Problem Difficulty"
          >
            Difficulty
          </th>
          <th
            className={styles.statusHeading}
            scope="col"
            aria-label="Problem Completion Status"
          >
            Status
          </th>
        </tr>
      </thead>
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
                aria-label={isCompleted ? "Completed" : "Incomplete"}
              >
                {problemIcon}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function getTaskIcon(completed: boolean) {
  if (completed) {
    return (
      <img
        src="/completed-status-icon.svg"
        alt="완료 문제 상태 아이콘"
        aria-label="Completed problem"
      ></img>
    );
  } else {
    return (
      <img
        src="/incomplete-status-icon.svg"
        alt="미완료 문제 상태 아이콘"
        aria-label="Incomplete problem"
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
