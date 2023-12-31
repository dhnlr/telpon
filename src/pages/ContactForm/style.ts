import { css } from "@emotion/react";

export const styContactFormContainer = css`
  width: 100%;
  margin: 0.2em;
`;

export const styContactFormContent = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4em;
  padding: 0.2em;
  & > label {
    margin-top: 0.95em;
  }
  & > input {
    border: 1px solid rgba(255, 255, 255, 0.87);
    border-radius: 8px;
    display: block;
    padding: 9px 4px 9px 40px;
    width: 70%;
    @media (prefers-color-scheme: light) {
      border: 1px solid #213547;
    }
  }
  & > p {
    text-align: center;
  }
`;

export const styContactFormButton = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 0.2em;
  margin: 0.35em 1em;
`;

export const styContactFormError = css`
  color: #f03a17;
  margin: 0;
`;

export const styContactFormContentPhoneContainer = css`
  display: flex;
  flex-direction: column;
  gap: 0.2em;
  width: 100%;
  & > button {
    width: 73%;
    align-self: center;
  }
  & > div > label {
    margin-top: 0.95em;
  }
  & > div > input {
    border: 1px solid rgba(255, 255, 255, 0.87);
    border-radius: 8px;
    display: block;
    padding: 9px 4px 9px 40px;
    width: 70%;
    @media (prefers-color-scheme: light) {
      border: 1px solid #213547;
    }
  }
`;

export const styContactFormContentPhoneContent = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.4em;
`;
