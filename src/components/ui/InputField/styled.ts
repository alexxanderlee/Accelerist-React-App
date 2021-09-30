import styled, { css } from 'styled-components';
import { eyeOffSvg, eyeSvg } from 'src/assets/icons';

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

export const Input = styled.input<{ error: boolean, isPasswordField: boolean }>`
  box-sizing: border-box;
  width: 100%;
  padding: ${props => props.isPasswordField ? '10px 40px 10px 16px' : '10px 16px'};
  background-color: #FFFFFF;
  border: 1px solid #E8E8E8;
  border-radius: 8px;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 155%;
  color: #122434;

  &::placeholder {
    color: #737373;
  }

  &:focus {
    outline: none;
    border: 1px solid #2BAEE0;
  }

  &:disabled {
    background-color: #F9F9F9;
    border: 1px solid #F9F9F9;
  }

  &:disabled::placeholder{
    color: #BFBFBF;
  }

  ${props => props.error && css`
    background-color: #FFF2F2;
    border: 1px solid #F05658;

    &:focus {
      border: 1px solid #F05658;
    }
  `}
`;

export const Label = styled.label`
  margin: 0;
  margin-bottom: 4px;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #737373;
`;

export const ErrorText = styled.p`
  position: absolute;
  margin: 0;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #F05658;
`;

export const InputBtn = styled.div<{ passwordHidden: boolean }>`
  position: absolute;
  top: 30px;
  right: 15px;
  cursor: pointer;
  background-image: ${props => props.passwordHidden ? css`url(${eyeOffSvg})` : css`url(${eyeSvg})`};
  width: 24px;
  height: 24px;
  opacity: 0.4;
`;
