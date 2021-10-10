import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs'
import { ILastLogin } from 'src/interfaces';

interface LastLoginItemProps {
  lastLogin: ILastLogin;
}

const LastLoginItem: React.FC<LastLoginItemProps> = ({ lastLogin: { loggedInAt, user } }) => {
  const firstChar = user.email[0].toUpperCase();
  const date = dayjs(loggedInAt).format('D MMM YYYY - HH:mm');

  return (
    <Root>
      <Avatar>
        <Char>{firstChar}</Char>
      </Avatar>
      <Info>
        <Username>{user.email}</Username>
        <StyledDate>{date}</StyledDate>
      </Info>
    </Root>
  );
};

const Avatar = styled.div`
  margin-right: 10px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #2081d6;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Char = styled.p`
  margin: 0;
  color: #FFFFFF;
  font-weight: 400;
  font-size: 15px;
`;

const Info = styled.div`
  flex: 1;
  padding: 7px 0 15px 0;
  border-bottom: 1px solid #EEEEEE;
  display: flex;
  justify-content: space-between;
`;

const Username = styled.p`
  margin: 0;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
  color: #122434;
`;

const StyledDate = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #737373;
`;

const Root = styled.div`
  margin-top: 8px;
  display: flex;

  &:last-child {
    & ${Info} {
      border-bottom: none;
    }
  }
`;

export default LastLoginItem;
