import { Card, Flex, Icon } from "daleui";
import type { Grade } from "../../api/services/types";
import GradeImage from "../GradeImage/GradeImage";
import styles from "./Card.module.css";

interface CardProps {
  id: string;
  name: string;
  cohorts: number[];
  grade: Grade;
}

export default function CardComponent({ id, name, cohorts, grade }: CardProps) {
  const cohortString = cohorts.join(", ");
  return (
    <Card id={id} tone="brand" outline={true}>
      <Flex gap="16">
        <GradeImage grade={grade} width={105} height={128} />
        <Card.Body>
          <Card.Title>
            <Flex align="center" gap="4">
              <Icon name="GitHub" />
              <span>{name}</span>
            </Flex>
          </Card.Title>
          <Card.Description>{cohortString}기</Card.Description>
        </Card.Body>
      </Flex>
      <Flex gap="16" justify="end" className={styles.widthFull}>
        <Card.Link href={`/progress?member=${id}`} external>
          풀이 현황
        </Card.Link>
        {!["SEED", "SPROUT", "LEAF"].includes(grade) && (
          <Card.Link href={`/certificate?member=${id}`} external>
            수료증
          </Card.Link>
        )}
      </Flex>
    </Card>
  );
}
