import { useQuery } from "@tanstack/react-query";
import { css } from "../../../styled-system/css";

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
  const names = [
    "DaleSeo",
    "sounmind",
    "yolophg",
    "Sunjae95",
    "HC-kang",
    "SamTheKorean",
  ];

  const member = names[Math.floor(Math.random() * names.length)];

  /* NOTE: 임시 코드, 추후 삭제 예정 */
  const { data: viteSvg, isLoading: isViteSvgLoading } = useQuery({
    queryKey: ["vite.svg"],
    queryFn: fetchViteSvg,
  });

  return (
    <div>
      {/* NOTE: 임시 코드, 추후 삭제 예정 */}
      {isViteSvgLoading && <p>Loading...</p>}
      {viteSvg && <img src={viteSvg} alt="Vite" />}

      <h1 className={css({ fontSize: "2rem", fontWeight: "bold" })}>
        Leaderboard
      </h1>

      <p>Go to random member's</p>
      <ul>
        <li>
          <a
            className={css({ textDecoration: "underline", color: "darkblue" })}
            href={`/progress?member=${member}`}
          >
            progress
          </a>
        </li>
        <li>
          <a
            className={css({ textDecoration: "underline", color: "darkblue" })}
            href={`/certificate?member=${member}`}
          >
            certificate
          </a>
        </li>
      </ul>
    </div>
  );
}
