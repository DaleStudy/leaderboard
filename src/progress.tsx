import { useSearchParams } from "react-router-dom";

export default function Progress() {
  const [searchParams] = useSearchParams();

  const member = searchParams.get("member");

  return <div>{member}'s Progress </div>;
}
