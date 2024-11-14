import { getMembers } from "../../api/services/store/storeService";
import useMembers from "../../hooks/useMembers";

import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import styles from "./Certificate.module.css";

export default function Certificate() {
  const { members, isLoading, error } = useMembers({ getMembers });
  console.log({ members, isLoading, error });

  const member = new URL(location.href).searchParams.get("member");

  /**
   * @description https://addtoprofile.linkedin.com/#header2
   * @argument field를 어디까지 채울것인가
   * @argument 프로필에 등록이라는 이미지가 존재하기에 대체할 것인가?
   */
  const linkedInURL = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${member}&organizationId=104834174&certUrl=${location.href}`;

  return (
    <main className={styles.certificate}>
      <Header />
      <section aria-labelledby="certification">
        <h2 id="certification">{member}님의 수료증</h2>
        <div>
          <p>귀하는 어쩌구 저쩌구</p>
        </div>
      </section>
      <section>
        <button onClick={() => window.print()}>출력</button>
        <a href={linkedInURL}>링크드인에 공유하기</a>
      </section>
      <Footer />
    </main>
  );
}
