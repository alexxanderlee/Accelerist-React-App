import React from 'react';
import styled from 'styled-components';
import LastLoginItem from './LastLoginItem';
import { ITeam, ILastLogin } from 'src/interfaces';
import { useAppSelector } from 'src/state/hooks';
import { teamSelectors } from 'src/state/features/team';
import { Loader, ErrorMessageBox } from 'src/components/ui';

const ReportsBlock: React.FC = () => {
  const team: ITeam = useAppSelector(teamSelectors.getTeam);
  const lastLogins: ILastLogin[] = useAppSelector(teamSelectors.getLastLogins);
  const isLoading = useAppSelector(teamSelectors.isLoading);
  const error = useAppSelector(teamSelectors.getError);

  if (error) {
    return (
      <Root>
        <ErrorMessageBox error={error.error} message={error.message} />
      </Root>
    );
  }

  if (!team || isLoading) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  }

  return (
    <Root>
      <Header>
        <HeaderItem>
          <SectionTitle>Search Sessions</SectionTitle>
          <CounterBlock>
            <CounterText>Total</CounterText>
            <CounterValue>{team.searchCount}</CounterValue>
          </CounterBlock>
        </HeaderItem>
        <HeaderItem>
          <SectionTitle>Sent Pitches</SectionTitle>
          <CounterBlock>
            <CounterText>Company</CounterText>
            <CounterValue>{team.pitchCount}</CounterValue>
          </CounterBlock>
        </HeaderItem>
      </Header>
      <SectionTitle>Prospect Navigator</SectionTitle>
      <ProspectNav href="!#" target="_blank">
        <ProspectNavTitle>Go to Page</ProspectNavTitle>
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 11 18" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M0.376638 0.376577C0.878741 -0.125526 1.69281 -0.125526 2.19491 0.376577L9.9092 8.09086C10.4113 8.59297 10.4113 9.40703 9.9092 9.90914L2.19491 17.6234C1.69281 18.1255 0.878741 18.1255 0.376638 17.6234C-0.125465 17.1213 -0.125465 16.3073 0.376638 15.8051L7.18179 9L0.376638 2.19485C-0.125465 1.69275 -0.125465 0.87868 0.376638 0.376577Z" fill="#BFBFBF"></path>
        </svg>
      </ProspectNav>
      <SectionTitle>Last Login</SectionTitle>
      <LastLoginList>
        {lastLogins.length > 0 && lastLogins.map(lastLogin => (
          <LastLoginItem key={lastLogin.id} lastLogin={lastLogin} />
        ))}
      </LastLoginList>
    </Root>
  );
};

const Root = styled.div`
  padding: 24px;
  background-color: #FFFFFF;
  border-radius: 6px;
`;

const LoaderWrapper = styled.div`
  padding: 70px 0;
  background-color: #FFFFFF;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.p`
  margin-top: 0;
  margin-bottom: 16px;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 145%;
  color: #122434;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const HeaderItem = styled.div`
  flex: 1;
  margin-right: 18px;

  &:last-child {
    margin-right: 0;
  }
`;

const CounterBlock = styled.div`
  padding: 5px 10px;
  background-color: #F9F9F9;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CounterText = styled.p`
  margin: 0;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #737373;
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

const ProspectNav = styled.a`
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  text-decoration: none;
  background-color: #F9F9F9;
  border-radius: 4px;
  cursor: pointer;
`;

const ProspectNavTitle = styled.p`
  margin: 0;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 155%;
  color: #122434;
`;

const LastLoginList = styled.div``;

export default ReportsBlock;
