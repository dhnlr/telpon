import { css } from "@emotion/react";

export const styListContainer = css`
  display: flex;
  flex-direction: row;
  gap: 1em;
  align-items: center;
  padding: 0.35em 1em;
  border-top: 1px solid black;
  cursor: pointer;
  &:hover {
    background: #1a1a1a
  }
  @media (prefers-color-scheme: light) {
    &:hover {
      background: #f9f9f9
    }
  }
`;

export const styListDetailContainer = css`
  display: flex;
  flex-direction: column;
`;

export const styListParagraph = css`
  margin: 0;
`;
