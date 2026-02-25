import styled, { css } from "styled-components";

export const Container = styled.main`
  display: ${({ display }) => display};
  flex-direction: ${({ flexDirection }) => flexDirection};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  column-gap: ${({ columnGap }) => columnGap};
  color: ${({ color }) => color};
  width: min(980px, 100%);
  row-gap: 2.5em;
  padding-inline: 0.4em;
`;

Container.defaultProps = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  columnGap: "10em",
  media: {
    flexDirection: "column",
    rowGap: "2em",
  },
};

export const Contact = styled.div`
  text-align: center;
  margin-bottom: 2em;

  a {
    margin: 0 0.5em;
    padding: 0.5em;
    border-radius: 50%;
    box-shadow: 0 0 3px 3px ${({ theme }) => theme.shadowColor};
    width: fit-content;
    font-size: 1.5rem;
    ${({ theme }) => theme.xl`
    font-size: 3rem;
  `}
  }
`;

export const ImageBox = styled.div`
  position: relative;
  margin-top: 2em;
  margin-bottom: 3em;
  border-radius: 50%;
  box-shadow: 0 0 3px 3px ${({ theme }) => theme.shadowColor};
  width: 15rem;
  height: 15rem;
  overflow: hidden;
  ${({ theme }) => theme.xl`
    width: 25rem;
    height: 25rem;
  `}
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2.2em;
  width: min(720px, 100%);

  a {
    padding: 0.5em 1em;
    border-radius: 5px;
    box-shadow: 0 0 3px 2px ${({ theme }) => theme.shadowColor};
    width: fit-content;
    font-size: 2rem;
    ${({ theme }) => theme.xl`
    font-size: 2.2rem;
  `}
  }
`;

export const Title = styled.p`
  font-size: 2.2rem;
  word-spacing: 0.1em;
  letter-spacing: 0.01em;
  white-space: pre-line;
  text-align: center;
  ${({ theme }) => theme.xl`
    font-size: 4.5rem;
  `}
`;

export const Comment = styled(Title)`
  font-size: 1.45rem;
  line-height: 1.5em;
  text-align: center;
  word-break: keep-all;
  ${({ theme }) => theme.xl`
    font-size: 2.2rem;
  `}
`;
