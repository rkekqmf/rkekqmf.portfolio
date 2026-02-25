import Animation from "../home/animation";
import FloatingMenu from "../layout/floatingMenu";
import styled from "styled-components";
import { comment } from "../../data/indexData";

const HomeSection = () => {
  const [line1 = "", line2 = "", line3 = ""] = comment.split("\n");
  const name = "서성용";
  const [beforeName = "", afterName = ""] = line3.split(name);

  return (
    <Container>
      <Animation />
      <Content>
        <p>
          {line1}
          <br />
          {line2}
          <br />
          {beforeName}
          <span className="name">{name}</span>
          {afterName}
        </p>
        <small>하나의 서비스를 처음부터 끝까지 책임질 수 있는 풀스택 개발자로 성장하고 있습니다.</small>
        <FloatingMenu embedded />
      </Content>
    </Container>
  );
};

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: min(980px, 100%);
  ${({ theme }) => theme.xl`
    column-gap: 7em;
    row-gap: 0;
  `};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2.5em;
  width: min(720px, 100%);

  p {
    font-size: 3.2rem;
    line-height: 1.3em;
    white-space: pre-line;
    text-align: center;
    word-break: keep-all;

    .name {
      color: #3586ff;
    }
  }

  small {
    font-size: 1.35rem;
    opacity: 0.8;
    text-align: center;
    line-height: 1.4;
    word-break: keep-all;
    margin-bottom: 6rem;
    ${({ theme }) => theme.sm`
      font-size: 1.5rem;
    `};
  }
`;

export default HomeSection;
