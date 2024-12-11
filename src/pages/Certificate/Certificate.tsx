import { getMembers } from "../../api/getMembers";
import Signature from "../../assets/signature.png";
import useMembers from "../../hooks/useMembers";

import Button from "../../components/Button/Button";
import Layout from "../../components/Layout/Layout";
import Link from "../../components/Link/Link";
import NotFound from "../../components/NotFound/NotFound";
import Spinner from "../../components/Spinner/Spinner";

import styles from "./Certificate.module.css";
import ServerError from "../../components/ServerError/ServerError";

const cohortSuffix = ["th", "st", "nd", "rd"];

export default function Certificate() {
  const { members, isLoading, error } = useMembers({ getMembers });

  if (isLoading) {
    return (
      <Layout>
        <main className={styles.loading}>
          <Spinner />
        </main>
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
                <ServerError />;
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

  const linkedInURL = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${member?.name}&organizationId=104834174&certUrl=${encodeURIComponent(location.href)}`;

  return (
    <Layout>
      <main className={styles.certificate}>
        <section>
          <div>
            <h1>수료증</h1>
            <section className={styles.content}>
              {/* TODO Icon component 구현시 className에 style값만 추가할 것*/}
              <div className={styles.contentSide}>
                <img
                  src="/top-left-corner-accent.svg"
                  alt="좌상단 모서리 테두리"
                />
                <img
                  src="/bottom-left-corner-accent.svg"
                  alt="좌하단 모서리 테두리"
                />
              </div>

              <div className={styles.description}>
                <img src="/logo-in-certificate.svg" alt="수료증 로고"></img>
                <h2>CERTIFICATE OF ACHIEVEMENT</h2>
                <h3>DaleStudy</h3>
                <h4>{member.name}</h4>

                <p>{`For successfully completing ${member.solvedProblems.length === 75 ? "all" : member.solvedProblems.length} problems\nin the LeetCode Blind 75 and contributing\nto knowledge sharing in the ${member.currentCohort}${cohortSuffix?.[member.currentCohort ?? 0] ?? "th"} DaleStudy.`}</p>

                <img className={styles.signature} src={Signature} alt="서명" />
                <h5>Dale Seo</h5>
                <span>DaleStudy Organizer</span>
              </div>

              <div className={styles.contentSide}>
                <img
                  src="/top-right-corner-accent.svg"
                  alt="우상단 모서리 테두리"
                />
                <img
                  src="/bottom-right-corner-accent.svg"
                  alt="우하단 모서리 테두리"
                />
              </div>
            </section>

            <section className={styles.buttons}>
              <Button
                variant="primary"
                size="large"
                onClick={() => window.print()}
              >
                출력
              </Button>

              <Link variant="primaryButton" href={linkedInURL}>
                링크드인 공유
              </Link>
            </section>
          </div>
        </section>
      </main>
    </Layout>
  );
}
