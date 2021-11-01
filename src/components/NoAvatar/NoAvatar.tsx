import React from 'react';
import styled, { css } from 'styled-components';

interface NoAvatarProps {
  username: string;
  variant?: 'dark' | 'light'
  size?: number;
}

const NoAvatar: React.FC<NoAvatarProps> = ({ username, variant = 'light', size = 40 }) => {
  const firstChar = username[0].toUpperCase();

  return (
    <Avatar variant={variant} size={size}>
      <Char>{firstChar}</Char>
    </Avatar>
  );
};

const Avatar = styled.div<{ variant: 'dark' | 'light', size: number }>`
  margin-right: 10px;
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${props => props.variant === 'dark' && css`
    color: #FFFFFF;
    background-color: #2081d6;
  `}

  ${props => props.variant === 'light' && css`
    color: #122434;
    background-color: #CAF0FF;
  `}
`;

const Char = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 16px;
`;

export default NoAvatar;
