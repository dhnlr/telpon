import { css } from "@emotion/react";

export const styContactListContainer = css`
  display: flex;
`;

export const styContactListSidebarContainer = (props: any) => css`
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
`;

export const styContactListDetailContainer = css`
  width: 100%;
`;

export const styContactListDetailContent = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
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
