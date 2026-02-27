import styled from "styled-components";
import ProfileSection from "./profileSection";
import { profileData } from "../../data/profileData";

const ProfileIntroSection = () => {
  const subtitle = profileData.intro?.join("\n") ?? "";

  return (
    <Container>
      <Title>프로필</Title>
      <SubTitle>{subtitle}</SubTitle>
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
  padding: 3rem 0;
  padding-bottom: 11rem;
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

const SubTitle = styled.p`
  font-size: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.fontColor};
  opacity: 0.75;
  margin: 0 0 3.5rem 0;
  white-space: pre-line;
  line-height: 1.55;
  word-break: keep-all;
`;

export default ProfileIntroSection;
