import styled from "styled-components";
import { introductionData } from "../../data/introductionData";

const IntroductionSection = () => {
  const { title, subtitle, paragraphs, strengths } = introductionData;

  return (
    <Container>
      <Title>{title}</Title>
      <SubTitle>{subtitle}</SubTitle>
      <Content>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </Content>
      <Strengths>
        {strengths.map((strength) => (
          <li key={strength}>{strength}</li>
        ))}
      </Strengths>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2.4em;
  align-items: center;
  width: min(980px, 100%);
`;

const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
  color: #3586ff;
`;

const SubTitle = styled.p`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1.4rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.4em;
  width: min(720px, 100%);

  p {
    font-size: 1.8rem;
    line-height: 1.7;
    text-align: center;
    word-break: keep-all;
  }
`;

const Strengths = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1em;

  li {
    padding: 0.6em 1em;
    border-radius: 999px;
    box-shadow: 0 0 3px 2px ${({ theme }) => theme.shadowColor};
    font-size: 1.4rem;
    opacity: 0.9;
  }
`;

export default IntroductionSection;
