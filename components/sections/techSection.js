import styled from "styled-components";
import { techData } from "../../data/techData";

const TechSection = () => {
  return (
    <Container>
      <Title>기술</Title>
      <SubTitle>활용 경험이 있는 기술 목록입니다.</SubTitle>
      <Rows>
        {techData.map((group) => (
          <Row key={group.category}>
            <Category>{group.category}</Category>
            <Items>
              {group.items.map((tech) => (
                <TechButton key={tech.name} type="button" title={tech.name} aria-label={tech.name}>
                  <img src={tech.icon} alt="" loading="lazy" />
                  <Label>{tech.name}</Label>
                </TechButton>
              ))}
            </Items>
          </Row>
        ))}
      </Rows>
    </Container>
  );
};

const Container = styled.div`
  width: min(980px, 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1.5rem;
  padding: 3rem 1rem 4rem;
  box-sizing: border-box;
  overflow-x: hidden;
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

  @media (max-width: 1024px) {
    margin-bottom: 0;
  }
`;

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  gap: 2rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 3.5rem 0 1.25rem;
  border-bottom: 1px solid rgba(102, 102, 102, 0.35);
  width: 100%;
  min-width: 0;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const Category = styled.p`
  font-size: 1.5rem;
`;

const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.1rem;
  width: 100%;
  min-width: 0;
`;

const Label = styled.span`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(0.4rem);
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  font-size: 1.1rem;
  white-space: nowrap;
  background: rgba(24, 24, 24, 0.9);
  color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s ease, visibility 0.15s ease;
  pointer-events: none;
`;

const TechButton = styled.button`
  position: relative;
  appearance: none;
  border: 1px solid rgba(102, 102, 102, 0.35);
  border-radius: 50%;
  padding: 0.85rem;
  background: transparent;
  cursor: default;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  img {
    width: 2.75rem;
    height: 2.75rem;
    object-fit: contain;
    display: block;
  }

  &:hover ${Label} {
    opacity: 1;
    visibility: visible;
  }
`;

export default TechSection;
