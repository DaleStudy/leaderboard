import { css } from "../../../styled-system/css";

export default function Certificate() {
  const member = new URL(location.href).searchParams.get("member");

  /**
   * @description https://addtoprofile.linkedin.com/#header2
   * @argument field를 어디까지 채울것인가
   * @argument 프로필에 등록이라는 이미지가 존재하기에 대체할 것인가?
   */
  const linkedInURL = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${member}&organizationId=104834174&certUrl=${location.href}`;

  return (
    <main>
      <section aria-labelledby="certification">
        <h2 id="certification">{member}님의 수료증</h2>
        <div>
          <p>귀하는 어쩌구 저쩌구</p>
        </div>
      </section>
      <section className={invisiblePrint}>
        <button onClick={() => window.print()}>출력</button>
        <a href={linkedInURL}>링크드인에 공유하기</a>
      </section>
    </main>
  );
}

const invisiblePrint = css({
  "@media print": { display: "none" },
});
