import { Button, Heading, Link, Text, VStack } from "daleui";
import Meta from "../Meta/Meta";

export default function ServerError() {
  return (
    <VStack gap="36">
      <Meta title="서버 오류" description="서버 오류가 발생했습니다." />

      <Heading level={2} size={1} tone="neutral">
        Error
      </Heading>
      <Text>
        오류가 발생했습니다. 문제가 지속된다면 아래 Github Issue를 방문하여{" "}
        <br />
        문제를 보고하거나 진행 상황을 확인해 주시면 감사하겠습니다.
      </Text>
      <Link
        href="https://github.com/DaleStudy/leaderboard/issues"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="solid">문제 보고하기</Button>
      </Link>
    </VStack>
  );
}
