export default function Leaderboard() {
  const names = [
    "DaleSeo",
    "sounmind",
    "yolophg",
    "Sunjae95",
    "HC-kang",
    "SamTheKorean",
  ];

  const member = names[Math.floor(Math.random() * names.length)];

  return (
    <div>
      <h1>Leaderboard</h1>
      <p>Go to random member's</p>
      <ul>
        <li>
          <a href={`/members/${member}/progress`}>progress</a>
        </li>
        <li>
          <a href={`/members/${member}/certificate`}>certificate</a>
        </li>
      </ul>
    </div>
  );
}
