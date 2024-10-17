import { useParams } from "react-router-dom";

export default function Certificate() {
  const { username } = useParams();

  return <div>{username}'s certificate</div>;
}
