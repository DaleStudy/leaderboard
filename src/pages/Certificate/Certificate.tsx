import { getMembers } from "../../api/getMembers";
import useMembers from "../../hooks/useMembers";
import Signature from "../../assets/signature.png";

import Layout from "../../components/Layout/Layout";
import Link from "../../components/Link/Link";
import Button from "../../components/Button/Button";

import styles from "./Certificate.module.css";

const cohortSuffix = ["th", "st", "nd", "rd"];

export default function Certificate() {
  const { members, isLoading, error } = useMembers({ getMembers });

  const member = members.find(
    ({ id }) =>
      id === new URLSearchParams(document.location.search).get("member"),
  );
  const linkedInURL = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${member?.name}&organizationId=104834174&certUrl=${location.href}`;

  if (isLoading) return <p>Loading...</p>; // TODO replace with a proper loading component
  if (error) return <p>Error!</p>; // TODO replace with a proper error component

  return (
    <Layout>
      <main className={styles.certificate}>
        <section>
          <div>
            <h1>수료증</h1>

            <section className={styles.content}>
              {/* TODO Icon component 구현시 className에 style값만 추가할 것*/}
              <div className={styles.contentSide}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="87"
                  height="88"
                  viewBox="0 0 87 88"
                  fill="none"
                >
                  <path
                    d="M2 1.99998V85.8899L23.6489 65.8565V25.2625L2 1.99998Z"
                    fill="url(#paint0_linear_1636_498)"
                    stroke="url(#paint1_linear_1636_498)"
                  />
                  <path
                    d="M85.7775 2.06592L2.02017 2.06592L23.7554 24.8898L65.7127 23.6809L85.7775 2.06592Z"
                    fill="url(#paint2_linear_1636_498)"
                    stroke="url(#paint3_linear_1636_498)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1636_498"
                      x1="2"
                      y1="85.8899"
                      x2="56.0426"
                      y2="46.9015"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#24EACA" />
                      <stop offset="1" stopColor="#846DE9" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_1636_498"
                      x1="2"
                      y1="85.8899"
                      x2="56.0426"
                      y2="46.9015"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#24EACA" />
                      <stop offset="1" stopColor="#846DE9" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_1636_498"
                      x1="2.02017"
                      y1="2.06592"
                      x2="43.78"
                      y2="56.8834"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#24EACA" />
                      <stop offset="1" stopColor="#846DE9" />
                    </linearGradient>
                    <linearGradient
                      id="paint3_linear_1636_498"
                      x1="2.02017"
                      y1="2.06592"
                      x2="43.78"
                      y2="56.8834"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#24EACA" />
                      <stop offset="1" stopColor="#846DE9" />
                    </linearGradient>
                  </defs>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="87"
                  height="88"
                  viewBox="0 0 87 88"
                  fill="none"
                  className={styles.reverse}
                >
                  <path
                    d="M85 1.99998V85.8899L63.3511 65.8565V25.2625L85 1.99998Z"
                    fill="url(#paint0_linear_1636_501)"
                    stroke="url(#paint1_linear_1636_501)"
                  />
                  <path
                    d="M1.22253 2.06592L84.9798 2.06592L63.2446 24.8898L21.2873 23.6809L1.22253 2.06592Z"
                    fill="url(#paint2_linear_1636_501)"
                    stroke="url(#paint3_linear_1636_501)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1636_501"
                      x1="85"
                      y1="85.8899"
                      x2="30.9574"
                      y2="46.9015"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#24EACA" />
                      <stop offset="1" stopColor="#846DE9" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_1636_501"
                      x1="85"
                      y1="85.8899"
                      x2="30.9574"
                      y2="46.9015"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#24EACA" />
                      <stop offset="1" stopColor="#846DE9" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_1636_501"
                      x1="84.9798"
                      y1="2.06592"
                      x2="43.22"
                      y2="56.8834"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#24EACA" />
                      <stop offset="1" stopColor="#846DE9" />
                    </linearGradient>
                    <linearGradient
                      id="paint3_linear_1636_501"
                      x1="84.9798"
                      y1="2.06592"
                      x2="43.22"
                      y2="56.8834"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#24EACA" />
                      <stop offset="1" stopColor="#846DE9" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className={styles.description}>
                <svg
                  width="75"
                  height="36"
                  viewBox="0 0 75 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24.9596 31.05L0.70957 20.35V16.85L24.9596 4.75V10.6L8.25957 18.35L24.9596 25.2V31.05ZM47.5729 0.299998L34.2729 36H27.5229L40.8229 0.299998H47.5729ZM49.9771 25.2L66.6771 18.35L49.9771 10.6V4.75L74.2271 16.85V20.35L49.9771 31.05V25.2Z"
                    fill="url(#paint0_linear_1647_82)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1647_82"
                      x1="-5"
                      y1="16.1219"
                      x2="80"
                      y2="16.1219"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#24EACA" />
                      <stop offset="1" stopColor="#846DE9" />
                    </linearGradient>
                  </defs>
                </svg>

                <h2>CERTIFICATE OF ACHIEVEMENT</h2>
                <h3>DaleStudy</h3>
                <h4>{member?.name}</h4>

                <p>{`For successfully completing ${member?.solvedProblems.length === 75 ? "all" : member?.solvedProblems.length} problems\nin the LeetCode Blind 75 and contributing\nto knowledge sharing in the ${member?.currentCohort}${cohortSuffix?.[member?.currentCohort ?? 0] ?? "th"} DaleStudy.`}</p>

                <img src={Signature} alt="signature" />
                <h5>Dale Seo</h5>
                <span>DaleStudy Organizer</span>
              </div>

              <div className={styles.contentSide}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="87"
                  height="88"
                  viewBox="0 0 87 88"
                  fill="none"
                >
                  <path
                    d="M85 1.99998V85.8899L63.3511 65.8565V25.2625L85 1.99998Z"
                    fill="url(#paint0_linear_1636_501)"
                    stroke="url(#paint1_linear_1636_501)"
                  />
                  <path
                    d="M1.22253 2.06592L84.9798 2.06592L63.2446 24.8898L21.2873 23.6809L1.22253 2.06592Z"
                    fill="url(#paint2_linear_1636_501)"
                    stroke="url(#paint3_linear_1636_501)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1636_501"
                      x1="85"
                      y1="85.8899"
                      x2="30.9574"
                      y2="46.9015"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#24EACA" />
                      <stop offset="1" stopColor="#846DE9" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_1636_501"
                      x1="85"
                      y1="85.8899"
                      x2="30.9574"
                      y2="46.9015"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#24EACA" />
                      <stop offset="1" stopColor="#846DE9" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_1636_501"
                      x1="84.9798"
                      y1="2.06592"
                      x2="43.22"
                      y2="56.8834"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#24EACA" />
                      <stop offset="1" stopColor="#846DE9" />
                    </linearGradient>
                    <linearGradient
                      id="paint3_linear_1636_501"
                      x1="84.9798"
                      y1="2.06592"
                      x2="43.22"
                      y2="56.8834"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#24EACA" />
                      <stop offset="1" stopColor="#846DE9" />
                    </linearGradient>
                  </defs>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="87"
                  height="88"
                  viewBox="0 0 87 88"
                  fill="none"
                  className={styles.reverse}
                >
                  <path
                    d="M2 1.99998V85.8899L23.6489 65.8565V25.2625L2 1.99998Z"
                    fill="url(#paint0_linear_1636_498)"
                    stroke="url(#paint1_linear_1636_498)"
                  />
                  <path
                    d="M85.7775 2.06592L2.02017 2.06592L23.7554 24.8898L65.7127 23.6809L85.7775 2.06592Z"
                    fill="url(#paint2_linear_1636_498)"
                    stroke="url(#paint3_linear_1636_498)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1636_498"
                      x1="2"
                      y1="85.8899"
                      x2="56.0426"
                      y2="46.9015"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#24EACA" />
                      <stop offset="1" stopColor="#846DE9" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_1636_498"
                      x1="2"
                      y1="85.8899"
                      x2="56.0426"
                      y2="46.9015"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#24EACA" />
                      <stop offset="1" stopColor="#846DE9" />
                    </linearGradient>
                    <linearGradient
                      id="paint2_linear_1636_498"
                      x1="2.02017"
                      y1="2.06592"
                      x2="43.78"
                      y2="56.8834"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#24EACA" />
                      <stop offset="1" stopColor="#846DE9" />
                    </linearGradient>
                    <linearGradient
                      id="paint3_linear_1636_498"
                      x1="2.02017"
                      y1="2.06592"
                      x2="43.78"
                      y2="56.8834"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#24EACA" />
                      <stop offset="1" stopColor="#846DE9" />
                    </linearGradient>
                  </defs>
                </svg>
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
