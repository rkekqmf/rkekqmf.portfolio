import styled from "styled-components";

export const OnePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.8rem;
`;

export const Section = styled.section`
  min-height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ $isHome }) => ($isHome ? "0 1.6rem 2.4rem" : "4.2rem 1.6rem 4.2rem")};
  scroll-margin-top: 7.5em;

  & > * {
    width: min(980px, 100%);
  }

  ${({ theme }) => theme.md`
    padding: ${({ $isHome }) => ($isHome ? "0 2.4rem 3rem" : "5.4rem 2.4rem 5.4rem")};
  `}
`;
