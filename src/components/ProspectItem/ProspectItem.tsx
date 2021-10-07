import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import dayjs from 'dayjs';
import { IProspect } from 'src/interfaces';

interface ProspectItemProps {
  prospect: IProspect;
}

const ProspectItem: React.FC<ProspectItemProps> = ({
  prospect: { name, filters, prospectsAvailable, lastAuthor, updatedAt },
}) => {
  const lastActivity = dayjs(updatedAt).format('D MMM YYYY');
  const firstChar = lastAuthor.email[0].toUpperCase();

  return (
    <Wrapper>
      <Header>
        <StyledLink to="!#">
          <Title>{name}</Title>
        </StyledLink>
      </Header>
      {!_.isEmpty(filters) && (
        <div>
          <Text>Filters</Text>
          <FiltersList>
            {Object.entries(filters).map(
              ([key, value], index) => <FilterItem key={index}>{key}: {value}</FilterItem>
            )}
          </FiltersList>
        </div>
      )}
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

const FiltersList = styled.div`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
`;

const FilterItem = styled.div`
  margin-right: 8px;
  padding: 6px 10px;
  border: 1px solid #CAF0FF;
  border-radius: 6px;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #122434;

  &:last-child {
    margin-right: 0;
  }
`;

const CounterBlock = styled.div`
  margin-top: 24px;
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

export default ProspectItem;
