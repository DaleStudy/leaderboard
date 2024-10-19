import { useLocation, useParams } from "react-router-dom";
import { css } from "../../../styled-system/css";

export default function Certificate() {
  const { username } = useParams();
  const { pathname } = useLocation();

  /**
   * @description https://addtoprofile.linkedin.com/#header2
   * @argument field를 어디까지 채울것인가
   * @argument 프로필에 등록이라는 이미지가 존재하기에 대체할 것인가?
   */
  const linkedInURL = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${username}&organizationId=104834174&certUrl=${pathname}`;

  return (
    <div>
      <main>
        <section>
          <h2>{username}님의 수료증</h2>
          <article>
            <p>귀하는 어쩌구 저쩌구</p>
          </article>
        </section>
        <section className={invisiblePrint}>
          <button onClick={() => window.print()}>출력</button>
          <a href={linkedInURL}>링크드인에 공유하기</a>
        </section>
      </main>
    </div>
  );
}

const invisiblePrint = css({
  "@media print": { display: "none" },
});
