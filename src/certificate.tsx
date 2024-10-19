import { useSearchParams } from "react-router-dom";

export default function Certificate() {
  const [searchParams] = useSearchParams();

  const member = searchParams.get("member");

  return <div>{member}'s certificate</div>;
}
