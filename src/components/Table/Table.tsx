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

function getTaskIcon(completed: boolean) {
  if (completed) {
    return (
      <svg
        width="18"
        height="14"
        viewBox="0 0 18 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        aria-label="Completed problem" // Keep this as is
      >
        <path
          d="M6.1136 13.725L0.263593 7.62349C-0.0878643 7.25692 -0.0878643 6.66256 0.263593 6.29596L1.53636 4.96843C1.88781 4.60182 2.4577 4.60182 2.80915 4.96843L6.75 9.07869L15.1908 0.274927C15.5423 -0.0916425 16.1122 -0.0916425 16.4636 0.274927L17.7364 1.60246C18.0879 1.96903 18.0879 2.56338 17.7364 2.92998L7.3864 13.7251C7.0349 14.0916 6.46506 14.0916 6.1136 13.725Z"
          fill="#846DE9"
        />
      </svg>
    );
  } else {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        aria-label="Incomplete problem" // Keep this as is
      >
        <path
          d="M14.7102 13.2417C15.1516 13.697 15.0813 14.3733 14.5501 14.7516C14.0189 15.13 13.2299 15.0697 12.7886 14.6144L7.5 9.17397L2.21144 14.6144C1.77008 15.0697 0.98109 15.13 0.44989 14.7516C-0.0813089 14.3733 -0.151615 13.697 0.289749 13.2417L5.87125 7.5L0.289749 1.75828C-0.151615 1.30296 -0.0813089 0.626678 0.44989 0.248361C0.98109 -0.129956 1.77008 -0.0696936 2.21144 0.385627L7.5 5.82603L12.7886 0.385627C13.2299 -0.0696936 14.0189 -0.129956 14.5501 0.248361C15.0813 0.626678 15.1516 1.30296 14.7102 1.75828L9.12875 7.5L14.7102 13.2417Z"
          fill="#846DE9"
          fillOpacity="0.4"
        />
      </svg>
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

function Table({ problems, solvedProblems }: TableProps) {
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
          const isCompleted = (solvedProblems || []).some(
            (solved) => solved.id === problem.id,
          );
          const problemIcon = getTaskIcon(isCompleted);
          const difficultyClass = getDifficultyClass(problem.difficulty);

          // Replace hyphens (-) with spaces in the title
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

export default Table;
