import styled from "styled-components";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Container>
      <Inner>
        <Text>감사합니다</Text>
        <Copyright>© {year} Portfolio</Copyright>
      </Inner>
    </Container>
  );
};

const Container = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Inner = styled.div`
  width: min(980px, 100%);
  padding: 4rem 1.6rem 3rem;
  border-top: 1px solid rgba(102, 102, 102, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 12rem;
`;

const Text = styled.p`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.fontColor};
  opacity: 0.85;
  margin: 0;
`;

const Copyright = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.fontColor};
  opacity: 0.6;
`;

export default Footer;
