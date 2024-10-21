import { useQuery } from "@tanstack/react-query";

/* NOTE: 임시 코드, 추후 삭제 예정 */
const fetchViteSvg = async () => {
  const response = await fetch("/vite.svg");
  if (!response.ok) {
    throw new Error("SVG 파일을 가져오는 데 실패했습니다.");
  }
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

export default function Leaderboard() {
  const members = [
    { name: "DaleSeo", solved: 71, rank: "새싹" },
    { name: "sounmind", solved: 69, rank: "나무" },
    { name: "yolophg", solved: 65, rank: "새싹" },
    { name: "Sunjae95", solved: 63, rank: "나무" },
    { name: "HC-kang", solved: 62, rank: "나무" },
    { name: "SamTheKorean", solved: 60, rank: "나무" },
  ];

  /* NOTE: 임시 코드, 추후 삭제 예정 */
  const { data: viteSvg, isLoading: isViteSvgLoading } = useQuery({
    queryKey: ["vite.svg"],
    queryFn: fetchViteSvg,
  });

  return (
    <main>
      {/* NOTE: 임시 코드, 추후 삭제 예정 */}
      {isViteSvgLoading && <p>Loading...</p>}
      {viteSvg && <img src={viteSvg} alt="Vite" />}

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
