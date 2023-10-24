import { css } from "@emotion/react";

export const styContactListContainer = css`
  height: 100%;
  width: 420px;
  @media (max-width: 420px) {
    width: 100%;
  }
`;

export const styContactListNavigation = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0em 1em;
`;

export const styContactListNavigationButton = css`
  height: 3.2em;
  font-size: 0.8em;
`;

export const styContactListNavigationButtonAdd = css(
  {
    "&:before": {
      content: '"➕ "',
    },
  },
  styContactListNavigationButton
);

export const styContactListNavigationButtonFav = css(
  {
    "&:before": {
      content: '"🔁 "',
    },
  },
  styContactListNavigationButton
);

export const styContactListListContainer = css`
  margin: 1em 0;
  width: 100%;
`;
