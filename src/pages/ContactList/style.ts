import { css } from "@emotion/react";

export const styContactListContainer = css`
  display: flex;
`;

export const styContactListSidebarContainer = (props: boolean) => css`
  height: 100%;
  min-width: 420px;
  @media (max-width: 420px) {
    min-width: 100%;
    ${props && { display: "none" }}
  }
`;

export const styContactListSidebarNavigation = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0em 1em;
`;

export const styContactListSidebarNavigationButton = css`
  min-height: 3.2em;
  font-size: 0.8em;
`;

export const styContactListSidebarNavigationButtonAdd = css(
  {
    "&:before": {
      content: '"➕ "',
    },
  },
  styContactListSidebarNavigationButton
);

export const styContactListSidebarNavigationButtonFav = css(
  {
    "&:before": {
      content: '"🔁 "',
    },
  },
  styContactListSidebarNavigationButton
);

export const styContactListSidebarListContainer = css`
  margin: 1em 0;
  width: 100%;
  height: calc(100svh - 310px); // vh - title - search - pagination
  overflow-y: auto;
`;
