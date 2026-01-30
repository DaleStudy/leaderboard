import {
  Heading,
  Button,
  Text,
  Link,
  Icon,
  HStack,
  VStack,
  Box,
  Flex,
} from "daleui";
import { getMembers } from "../../api/getMembers";
import Signature from "../../assets/signature.png";
import useMembers from "../../hooks/useMembers";

import Layout from "../../components/Layout/Layout";
import NotFound from "../../components/NotFound/NotFound";
import Unqualified from "../../components/Unqualified/Unqualified";
import Spinner from "../../components/Spinner/Spinner";
import ServerError from "../../components/ServerError/ServerError";

import styles from "./Certificate.module.css";
import { gradeEmojiMap } from "./constants";
import Meta from "../../components/Meta/Meta";

const cohortSuffix = ["th", "st", "nd", "rd"];

export default function Certificate() {
  const { members, isLoading, error } = useMembers({ getMembers });

  if (isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <main className={styles.certificate}>
          <section>
            <div>
              <h1>수료증</h1>
              <section className={styles.serverErrorWrapper}>
                <ServerError />
              </section>
            </div>
          </section>
        </main>
      </Layout>
    );
  }

  const member = members.find(
    ({ id }) =>
      id === new URLSearchParams(document.location.search).get("member"),
  );

  if (!member) {
    return (
      <Layout>
        <NotFound />
      </Layout>
    );
  }

  if (["SEED", "SPROUT", "LEAF"].includes(member.grade)) {
    return (
      <Layout>
        <Unqualified />
      </Layout>
    );
  }

  const certificateName = `Leetcode 75 ${gradeEmojiMap[member.grade]}`;

  const params = new URLSearchParams({
    startTask: "CERTIFICATION_NAME",
    name: certificateName,
    organizationId: "104834174",
    certUrl: location.href,
  });

  const linkedInURL = `https://www.linkedin.com/profile/add?${params.toString()}`;

  return (
    <Layout>
      <Box as="main" className={styles.certificate}>
        <Box as="section">
          <Meta
            title={`${member.name}의 수료증`}
            description="수료증을 발급받아보세요!"
            url={window.location.href}
          />
          <Button
            tone="neutral"
            variant="ghost"
            leftIcon="chevronLeft"
            size="lg"
            onClick={() => (window.location.href = "/")}
            className={styles.backButton}
          >
            리더보드로 돌아가기
          </Button>

          <Heading
            level={4}
            tone="neutral"
            align="left"
            className={styles.certificateTitle}
          >
            수료증
          </Heading>

          <Flex gap="16" align="center" justify="center" direction="column">
            {/* 수료증 */}
            <Box as="div" className={styles.content}>
              <Box
                as="div"
                width="70%"
                height="80%"
                className={styles.description}
              >
                <VStack gap="16">
                  <Heading level={5} tone="brand" align="center">
                    CERTIFICATE OF ACHIEVEMENT
                  </Heading>
                  <Text size="sm" tone="success">
                    DaleStudy
                  </Text>
                </VStack>

                <Link href="/" tone="brand" underline={false} size="lg">
                  {member.name}
                  <Icon name="externalLink" size="sm" tone="brand" />
                </Link>

                <Text
                  size="sm"
                  tone="neutral"
                  className={styles.descriptionText}
                >{`For successfully completing ${member.solvedProblems.length === 75 ? "all" : member.solvedProblems.length} problems\nin the LeetCode Blind 75 and contributing\nto knowledge sharing in the ${member.cohorts.at(-1)}${cohortSuffix?.[member.cohorts.at(-1) ?? 0] ?? "th"} DaleStudy.`}</Text>
                <VStack gap="16">
                  <HStack gap="16">
                    <img
                      className={styles.signature}
                      src={Signature}
                      alt="서명"
                    />
                    <Box as="div" className={styles.signatureDivider}></Box>
                    <Text size="lg" tone="info">
                      Dale Seo
                    </Text>
                  </HStack>
                  <Text size="sm" tone="neutral">
                    DaleStudy Organizer
                  </Text>
                </VStack>
              </Box>
            </Box>

            {/* 출력 & 링크드인 공유 버튼 */}
            <Box as="div" className={styles.buttons}>
              <HStack gap="16">
                <Button
                  tone="neutral"
                  variant="solid"
                  size="lg"
                  fullWidth={false}
                  onClick={() => window.print()}
                >
                  출력
                </Button>

                <Button
                  tone="neutral"
                  variant="solid"
                  rightIcon="externalLink"
                  size="lg"
                  fullWidth={false}
                  onClick={() => window.open(linkedInURL, "_blank")}
                >
                  링크드인 공유
                </Button>
              </HStack>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Layout>
  );
}
