import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { profileData } from "../../data/profileData";

const ProfileSection = () => {
  const { name, career, age, contact, email, desiredSalary, workConditions, workLocation } = profileData;

  const rows = [
    { label: "이름", value: name },
    { label: "경력", value: career },
    ...(age ? [{ label: "나이", value: age }] : []),
    ...(desiredSalary ? [{ label: "희망 연봉", value: desiredSalary }] : []),
    ...(workConditions ? [{ label: "희망 근무조건", value: workConditions }] : []),
    ...(workLocation ? [{ label: "희망 근무지역", value: workLocation }] : []),
    { label: "연락처", value: contact, href: `tel:${contact.replace(/-/g, "")}` },
    { label: "이메일", value: email, href: `mailto:${email}` },
  ];

  return (
    <Container>
      <ProfileList>
        {rows.map(({ label, value, href }) => (
          <Row key={label}>
            <Label>{label}</Label>
            <Value>
              {href ? (
                <a href={href} target="_blank" rel="noreferrer">
                  {label === "연락처" && <FontAwesomeIcon icon={faPhone} />}
                  {label === "이메일" && <FontAwesomeIcon icon={faEnvelope} />}
                  <span>{value}</span>
                </a>
              ) : (
                value
              )}
            </Value>
          </Row>
        ))}
      </ProfileList>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(720px, 100%);
  gap: 2.5rem;
  padding: 0 0.5rem;
`;

const ProfileList = styled.dl`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0;
  width: 100%;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 8rem 1fr;
  gap: 1rem;
  align-items: baseline;
  font-size: 1.4rem;
  line-height: 1.5;

  @media (min-width: 641px) {
    grid-template-columns: 9rem 1fr;
    font-size: 1.5rem;
  }
`;

const Label = styled.dt`
  margin: 0;
  color: ${({ theme }) => theme.fontColor};
  opacity: 0.8;
`;

const Value = styled.dd`
  margin: 0;
  color: ${({ theme }) => theme.fontColor};

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #3586ff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default ProfileSection;
