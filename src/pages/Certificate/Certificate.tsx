import { getMembers } from "../../api/getMembers";
import Signature from "../../assets/signature.png";
import useMembers from "../../hooks/useMembers";

import Button from "../../components/Button/Button";
import Layout from "../../components/Layout/Layout";
import Link from "../../components/Link/Link";
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
      <main className={styles.certificate}>
        <section>
          <Meta
            title={`${member.name}의 수료증`}
            description="수료증을 발급받아보세요!"
            url={window.location.href}
          />

          <h1>수료증</h1>

          <div className={styles.mobileButtonWrapper}>
            <Link variant="secondaryButton" href="/">
              리더보드로 돌아가기
            </Link>
          </div>

          <section className={styles.content}>
            <div className={styles.description}>
              <img src="/logo-in-certificate.svg" alt="수료증 로고"></img>
              <h2>CERTIFICATE OF ACHIEVEMENT</h2>
              <h3>DaleStudy</h3>
              <h4>{member.name}</h4>

              <p>{`For successfully completing ${member.solvedProblems.length === 75 ? "all" : member.solvedProblems.length} problems\nin the LeetCode Blind 75 and contributing\nto knowledge sharing in the ${member.cohorts.at(-1)}${cohortSuffix?.[member.cohorts.at(-1) ?? 0] ?? "th"} DaleStudy.`}</p>

              <img className={styles.signature} src={Signature} alt="서명" />
              <h5>Dale Seo</h5>
              <span>DaleStudy Organizer</span>
            </div>

            <img
              className={`${styles.cornerAccent} ${styles.top} ${styles.left}`}
              src="/top-left-corner-accent.svg"
              alt="좌상단 모서리 테두리"
            />
            <img
              className={`${styles.cornerAccent} ${styles.bottom} ${styles.left}`}
              src="/bottom-left-corner-accent.svg"
              alt="좌하단 모서리 테두리"
            />
            <img
              className={`${styles.cornerAccent} ${styles.top} ${styles.right}`}
              src="/top-right-corner-accent.svg"
              alt="우상단 모서리 테두리"
            />
            <img
              className={`${styles.cornerAccent} ${styles.bottom} ${styles.right}`}
              src="/bottom-right-corner-accent.svg"
              alt="우하단 모서리 테두리"
            />
          </section>

          <section className={styles.buttons}>
            <Link variant="secondaryButton" href="/">
              리더보드로 돌아가기
            </Link>

            <div>
              <Button
                variant="primary"
                size="large"
                onClick={() => window.print()}
              >
                출력
              </Button>

              <Link variant="primaryButton" href={linkedInURL} target="_blank">
                링크드인 공유
              </Link>
            </div>
          </section>
        </section>
      </main>
    </Layout>
  );
}
