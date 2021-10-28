import React from 'react';
import * as Styles from './ButtonStyles';
import styled, { CSSProp, css } from 'styled-components';

interface ButtonProps {
  text?: string;
  type?: 'button' | 'reset' | 'submit';
  variant?: 'FilledPrimary' | 'OutlinedPrimary' | 'Transparent' | 'OutlinedSecondary' | 'OutlinedDanger';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  customStyle?: CSSProp;
  icon?: string;
}

interface StyledButtonProps {
  variant: 'FilledPrimary' | 'OutlinedPrimary' | 'Transparent' | 'OutlinedSecondary' | 'OutlinedDanger';
  customStyle?: CSSProp;
  icon?: string;
}

const StyledButton = styled.button<StyledButtonProps>`
  ${props => Styles[props.variant]}
  ${props => props.customStyle}
  ${props => props.icon && css`
    position: relative;
    padding: 9px 16px 9px 40px;

    &:before {
      content: ' ';
      display: block;
      background-image: url(${props.icon});
      width: 18px;
      height: 18px;
      position: absolute;
      top: 9px;
      left: 16px;
    }
  `}
`;

const Button: React.FC<ButtonProps> = ({
  text,
  type = 'submit',
  variant = 'FilledPrimary',
  loading = false,
  disabled = false,
  onClick,
  customStyle,
  icon,
}) => (
  <StyledButton
    type={type}
    disabled={disabled || loading}
    variant={variant}
    onClick={onClick}
    customStyle={customStyle}
    icon={icon}
  >
    {loading ? 'loading...' : text }
  </StyledButton>
);

export default Button;
