import { css } from "@emotion/react";

export const styContactListDetailContainer = css`
  width: 100%;
`;

export const styContactListDetailContent = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100% - 50px); // parent - buttonDetail
`;

export const styContactListDetailButton = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 0.2em;
  margin: 0.35em 1em;
`;

export const styContactListDetailButtonGroup = css`
  display: flex;
  gap: 0.2em;
`;
