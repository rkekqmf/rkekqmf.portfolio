import styled from "styled-components";
import ProfileSection from "./profileSection";
import { profileData } from "../../data/profileData";

const ProfileIntroSection = () => {
  const lines = profileData.intro ?? [];
  const linesPC = lines.map((line) => line.replace(/\n/g, " "));

  return (
    <Container>
      <Title>프로필</Title>
      <SubTitleBlock>
        <SubTitlePC>
          {linesPC.map((line, i) => (
            <SubTitlePCLine key={i}>{line}</SubTitlePCLine>
          ))}
        </SubTitlePC>
        <SubTitleMobile>
          {lines.map((line, i) => (
            <SubTitleLine key={i}>{line}</SubTitleLine>
          ))}
        </SubTitleMobile>
      </SubTitleBlock>
      <ProfileSectionWrap>
        <ProfileSection />
      </ProfileSectionWrap>
    </Container>
  );
};

const Container = styled.div`
  width: min(980px, 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1.5rem;
  padding: 3rem 0 0;

  @media (max-width: 1024px) {
    padding-bottom: 3rem;
  }
`;

const ProfileSectionWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 2.25rem;
  text-align: center;
  color: #3586ff;
  letter-spacing: -0.02em;
  margin: 0;
`;

const SubTitleBlock = styled.div`
  margin: 0 0 3.5rem 0;
  text-align: center;

  @media (max-width: 1024px) {
    margin-bottom: 0;
  }
`;

const SubTitlePC = styled.div`
  display: block;
  margin: 0;

  @media (max-width: 640px) {
    display: none;
  }
`;

const SubTitlePCLine = styled.p`
  margin: 0;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.fontColor};
  opacity: 0.75;
  line-height: 1.55;
  word-break: keep-all;

  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const SubTitleMobile = styled.div`
  display: none;

  @media (max-width: 640px) {
    display: block;
  }
`;

const SubTitleLine = styled.p`
  margin: 0;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.fontColor};
  opacity: 0.75;
  white-space: pre-line;
  line-height: 1.5;
  word-break: keep-all;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export default ProfileIntroSection;
