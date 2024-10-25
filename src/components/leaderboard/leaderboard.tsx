export default function Leaderboard() {
  const members = [
    { name: "DaleSeo", solved: 71, rank: "새싹" },
    { name: "sounmind", solved: 69, rank: "나무" },
    { name: "yolophg", solved: 65, rank: "새싹" },
    { name: "Sunjae95", solved: 63, rank: "나무" },
    { name: "HC-kang", solved: 62, rank: "나무" },
    { name: "SamTheKorean", solved: 60, rank: "나무" },
  ];

  return (
    <main>
      <h1>Leaderboard</h1>

      <section aria-labelledby="leaderboard">
        <h2 id="leaderboard">Members List</h2>
        <ul>
          {members.map((member) => (
            <li key={member.name} style={{ marginBottom: "20px" }}>
              <div>등급: {member.rank}</div>
              <div>푼 문제: {member.solved}</div>
              <div>
                <a href={`/progress?member=${member.name}`}>
                  <button>풀이 보기</button>
                </a>
                <a href={`/certificate?member=${member.name}`}>
                  <button>수료증 보기</button>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
