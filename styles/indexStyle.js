import styled from "styled-components";

export const Container = styled.main`
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

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1.2em;
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
    ${({ theme }) => theme.sm`
      font-size: 1.5rem;
    `};
  }

  div {
    margin-top: 0.8em;
    width: 100%;
  }
`;
