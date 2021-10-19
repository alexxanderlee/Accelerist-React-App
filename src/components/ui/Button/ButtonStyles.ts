import { css } from 'styled-components';

export const FilledButton = css`
  width: 100%;
  padding: 12px 24px;
  background-color: #2BAEE0;
  border-radius: 6px;
  border: none;
  text-align: center;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  color: #FFFFFF;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #51C2EE;
  }

  &:active {
    background-color: #1DA7DC;
  }

  &:disabled {
    background-color: #CEEDF9;
    color: rgba(43, 174, 224, 0.3);
    cursor: default;
  }
`;

export const OutlinedButton = css`
  width: 100%;
  padding: 9px 100px;
  background-color: #FFFFFF;
  border-radius: 6px;
  border: 1px solid #2BAEE0;
  text-align: center;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #122434;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #EBF9FF;
  }

  &:active {
    background-color: #CAF0FF;
  }

  &:disabled {
    background-color: #CEEDF9;
    border: 1px solid rgba(43, 174, 224, 0.3);
    color: rgba(43, 174, 224, 0.3);
    cursor: default;
  }
`;

export const TransparentButton = css`
  padding: 9px 24px;
  background-color: rgba(18, 36, 52, 0.15);
  border-radius: 6px;
  text-align: center;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
  color: #FFFFFF;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(18, 36, 52, 0.25);
  }
`;

export const OutlinedGray = css`
  padding: 12px 46px;
  border: 1px solid #E8E8E8;
  border-radius: 6px;
  background-color: #FFFFFF;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 155%;
  color: #122434;
  cursor: pointer;
  transition: border 0.2s;

  &:hover {
    border: 1px solid #BFBFBF;
  }

  &:active {
    border: 1px solid #2BAEE0;
  }
`;
