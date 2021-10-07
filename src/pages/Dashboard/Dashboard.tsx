import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ContentWrapper } from 'src/layouts';
import {
  ReportsBlock,
  ProspectsList,
  FavouritesList,
} from 'src/components';
import { IProspect, ICompany, ITeam, ILastLogin } from 'src/interfaces';

interface DashboardProps {
}

const prospects: IProspect[] = [
  {
    id: '1',
    name: 'Prospect 1',
    filters: {
      'gender': 'male',
    },
    prospectsAvailable: 23,
    lastAuthor: {
      id: 'eb893b0e-ce28-4392-a824-4a3ff9c36e79',
      email: 'user@example.com',
      firstName: 'Test',
      lastName: 'Test',
      role: 'Owner',
    },
    createdAt: '2021-07-23T08:14:15.185Z',
    updatedAt: '2021-07-23T08:14:15.185Z',
  },
  {
    id: '2',
    name: 'Prospect 2',
    filters: {
      'gender': 'female',
    },
    prospectsAvailable: 44,
    lastAuthor: {
      id: 'eb893b0e-ce28-4392-a824-4a3ff9c36e79',
      email: 'user@example.com',
      firstName: 'Test',
      lastName: 'Test',
      role: 'Owner',
    },
    createdAt: '2021-07-23T08:14:15.185Z',
    updatedAt: '2021-07-23T08:14:15.185Z',
  },
];

const favoutrites: ICompany[] = [
  {
    id: '1',
    name: 'NASA',
    score: 12,
    crsFocus: ['Health', 'Animals', 'Education'],
  },
  {
    id: '2',
    name: 'Samsung',
    logo: 'https://www.pictureblast.co.uk/wp-content/uploads/2016/02/Samsung-logo-2017-square.png',
    score: 43,
    crsFocus: ['Health', 'Animals', 'Education'],
  },
  {
    id: '3',
    name: 'Alfa Bank',
    score: 15,
    crsFocus: [],
  },
];

const team: ITeam = {
  id: '1',
  searchCount: 42,
  pitchCount: 13,
};

const lastLogins: ILastLogin[] = [
  {
    id: '474de219-28b8-4e5d-ba12-92380624b976',
    loggedInAt: '2021-10-07T14:52:00.483Z',
    user: {
      id: 'eb893b0e-ce28-4392-a824-4a3ff9c36e79',
      email: 'user@example.com',
      firstName: 'Test',
      lastName: 'Test',
      role: 'Owner',
    },
  },
  {
    id: '22d5a106-0137-4cc0-b8ab-3142b96d3725',
    loggedInAt: '2021-10-07T14:38:57.443Z',
    user: {
      id: 'eb893b0e-ce28-4392-a824-4a3ff9c36e79',
      email: 'user@example.com',
      firstName: 'Test',
      lastName: 'Test',
      role: 'Owner',
    },
  },
];

const Dashboard: React.FC<DashboardProps> = (props) => {

  return (
    <ContentWrapper pageTitle="Dashboard">
      <Grid>
        <GridTopItem>
          <ItemHeader>
            <ItemTitle>Prospecting Sessions</ItemTitle>
            <ItemLink to="!#">see more</ItemLink>
          </ItemHeader>
          <ProspectsList prospects={prospects} />
        </GridTopItem>
        <GridItem>
          <ItemHeader>
            <ItemTitle>Favourites</ItemTitle>
            <ItemLink to="!#">see more</ItemLink>
          </ItemHeader>
          <FavouritesList favourites={favoutrites} />
        </GridItem>
        <GridItem>
          <ItemHeader>
            <ItemTitle>Reports</ItemTitle>
          </ItemHeader>
          <ReportsBlock team={team} lastLogins={lastLogins} />
        </GridItem>
      </Grid>
    </ContentWrapper>
  );
};

const Grid = styled.div`
  max-width: 1096px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 24px;
  grid-row-gap: 40px;
`;

const GridTopItem = styled.div`
  margin-top: 32px;
  grid-column: 1 / 3;
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemHeader = styled.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemTitle = styled.h3`
  margin: 0;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 148%;
  color: #122434;
`;

const ItemLink = styled(Link)`
  text-decoration: none;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #2BAEE0;

  &:hover {
    color: #50d6ff;
    text-decoration: underline;
  }
`;

export default Dashboard;
