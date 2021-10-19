import React from 'react';
import * as Styles from './ButtonStyles';
import styled, { CSSProp } from 'styled-components';

interface ButtonProps {
  text?: string;
  type?: 'button' | 'reset' | 'submit';
  variant?: 'FilledButton' | 'OutlinedButton' | 'TransparentButton' | 'OutlinedGray';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  customStyle?: CSSProp;
}

interface StyledButtonProps {
  variant: 'FilledButton' | 'OutlinedButton' | 'TransparentButton' | 'OutlinedGray';
  customStyle?: CSSProp;
}

const StyledButton = styled.button<StyledButtonProps>`
  ${props => Styles[props.variant]}
  ${props => props.customStyle}
`;

const Button: React.FC<ButtonProps> = ({
  text,
  type = 'submit',
  variant = 'FilledButton',
  loading = false,
  disabled = false,
  onClick,
  customStyle,
}) => (
  <StyledButton
    type={type}
    disabled={disabled || loading}
    variant={variant}
    onClick={onClick}
    customStyle={customStyle}
  >
    {loading ? 'loading...' : text }
  </StyledButton>
);

export default Button;
