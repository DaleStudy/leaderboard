export default function Progress() {
  const tasks = [
    { id: 128, title: "Longest Consecutive Sequence", difficulty: "Med." },
    { id: 1, title: "Two Sum", difficulty: "Easy" },
    { id: 257, title: "Binary Tree Paths", difficulty: "Easy" },
    { id: 133, title: "Clone Graph", difficulty: "Med." },
  ];

  return (
    <main>
      <h1>Progress</h1>

      <section aria-labelledby="profile">
        <h2 id="profile">Profile Section</h2>
        <div>
          <img src="profile_image_url" alt="Profile" />
          <h3>0 Attempting</h3>
          <p>Easy: 12/12</p>
          <p>Med.: 22/22</p>
          <p>Hard: 1/1</p>
        </div>
        <button>PR 리스트</button>
      </section>

      <section aria-labelledby="problem-list">
        <h2 id="problem-list">Task List</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <span>{task.title}</span>
              <span> {task.difficulty}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
