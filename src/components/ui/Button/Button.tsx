import React from 'react';
import * as Styles from './ButtonStyles';
import styled from 'styled-components';

interface ButtonProps {
  text?: string;
  type?: 'button' | 'reset' | 'submit';
  variant?: 'FilledButton' | 'OutlinedButton' | 'TransparentButton';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

interface StyledButtonProps {
  variant: 'FilledButton' | 'OutlinedButton' | 'TransparentButton';
}

const StyledButton = styled.button<StyledButtonProps>`
  ${props => Styles[props.variant]}
`;

const Button: React.FC<ButtonProps> = ({
  text,
  type = 'submit',
  variant = 'FilledButton',
  loading = false,
  disabled = false,
  onClick,
}) => (
  <StyledButton
    type={type}
    disabled={disabled || loading}
    variant={variant}
    onClick={onClick}
  >
    {loading ? 'loading...' : text }
  </StyledButton>
);

export default Button;
