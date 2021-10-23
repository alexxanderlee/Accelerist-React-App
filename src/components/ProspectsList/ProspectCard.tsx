import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Filters } from 'src/components';
import { IProspect } from 'src/interfaces';

interface ProspectCardProps {
  prospect: IProspect;
}

const ProspectCard: React.FC<ProspectCardProps> = ({
  prospect: { id, name, filters, prospectsAvailable, lastAuthor, updatedAt },
}) => {
  const lastActivity = dayjs(updatedAt).format('D MMM YYYY');
  const firstChar = lastAuthor.email[0].toUpperCase();

  return (
    <Wrapper>
      <Header>
        <StyledLink to={`/prospects/${id}`}>
          <Title>{name ? name : 'Unnamed'}</Title>
        </StyledLink>
      </Header>
      <Filters filters={filters} limit={3} />
      <CounterBlock>
        <Text>№ of Prospects Available</Text>
        <CounterValue>{prospectsAvailable}</CounterValue>
      </CounterBlock>
      <Footer>
        <UserBlock>
          <Avatar>
            <Char>{firstChar}</Char>
          </Avatar>
          <div>
            <Username>{lastAuthor.email}</Username>
            <Text>{lastAuthor.role}</Text>
          </div>
        </UserBlock>
        <Meta>
          <Text>Last Activity</Text>
          <Date>{lastActivity}</Date>
        </Meta>
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 24px;
  background-color: #FFFFFF;
  border-radius: 6px;
`;

const Header = styled.div`
  margin-bottom: 16px;
  padding-bottom: 9px;
  border-bottom: 1px solid #E8E8E8;
`;

const Title = styled.p`
  margin: 0;
  font-family: 'Rubik', sans-serif;
  font-style: 400;
  font-weight: 500;
  font-size: 16px;
  line-height: 145%;
  color: #122434;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Text = styled.p`
  margin: 0;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #737373;
`;

const CounterBlock = styled.div`
  margin-top: 16px;
  padding: 5px 10px;
  background-color: #F9F9F9;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CounterValue = styled.p`
  margin-top: 8px;
  margin-bottom: 0;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 148%;
  color: #122434;
`;

const Footer = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
`;

const UserBlock = styled.div`
  display: flex;
`;

const Avatar = styled.div`
  margin-right: 12px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #CAF0FF;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Char = styled.p`
  margin: 0;
  color: #122434;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 18px;
`;

const Username = styled.p`
  margin-top: 0;
  margin-bottom: 4px;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
  color: #122434;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Date = styled.p`
  margin-bottom: 0;
  margin-top: 4px;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #122434
`;

export default ProspectCard;
