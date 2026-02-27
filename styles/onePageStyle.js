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
  padding: ${({ $isHome }) => ($isHome ? "0 1.6rem 0.8rem" : "1rem 1.6rem 1rem")};
  scroll-margin-top: 7.5em;

  & > * {
    width: min(980px, 100%);
  }

  @media (min-width: 641px) {
    padding: ${({ $isHome }) => ($isHome ? "0 1.6rem 1.5rem" : "2.5rem 1.6rem 2.5rem")};
  }

  @media (min-width: 1025px) {
    padding: ${({ $isHome }) => ($isHome ? "0 2.4rem 3rem" : "5.4rem 2.4rem 5.4rem")};
  }

`;
