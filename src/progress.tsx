import { useParams } from "react-router-dom";

export default function Progress() {
  const { username } = useParams();

  return <div>{username}'s Progress </div>;
}
