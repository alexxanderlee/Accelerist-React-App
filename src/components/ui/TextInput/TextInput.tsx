import React from 'react';
import styled, { css, CSSProp } from 'styled-components';


interface InputProps {
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  type?: string;
  customStyle?: CSSProp;
  error?: boolean;
} 

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  disabled,
  customStyle,
  error,
  autoFocus,
  type = 'text',
}) => (
  <StyledInput
    value={value}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    autoFocus={autoFocus}
    type={type}
    disabled={disabled}
    placeholder={placeholder}
    customStyle={customStyle}
    error={error}
  />
);

const StyledInput = styled.input<{ error?: boolean, customStyle?: CSSProp }>`
  box-sizing: border-box;
  width: 100%;
  padding: 10px 16px;
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

  ${props => props.customStyle}
`;

export default Input;
