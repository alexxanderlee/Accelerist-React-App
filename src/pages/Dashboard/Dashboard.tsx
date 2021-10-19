import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ContentWrapper } from 'src/layouts';
import {
  ReportsBlock,
  ProspectsList,
  FavouritesList,
} from 'src/components';
import { useAppDispatch } from 'src/state/hooks';
import { teamActions } from 'src/state/features/team';
import { savedListActions } from 'src/state/features/savedList';
import { companiesActions } from 'src/state/features/companies';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(teamActions.getTeam());
    dispatch(teamActions.getLastLogins());
    dispatch(savedListActions.getSavedLists({ page: 1, limit: 2, sort: 'alphabet' }));
    dispatch(companiesActions.getFavouriteCompanies({ page: 1, limit: 6 }));
  }, []);

  return (
    <ContentWrapper pageTitle="Dashboard">
      <Grid>
        <GridTopItem>
          <ItemHeader>
            <ItemTitle>Prospecting Sessions</ItemTitle>
            <ItemLink to="/prospects">see more</ItemLink>
          </ItemHeader>
          <ProspectsList />
        </GridTopItem>
        <GridItem>
          <ItemHeader>
            <ItemTitle>Favourites</ItemTitle>
            <ItemLink to="/favourites">see more</ItemLink>
          </ItemHeader>
          <FavouritesList />
        </GridItem>
        <GridItem>
          <ItemHeader>
            <ItemTitle>Reports</ItemTitle>
          </ItemHeader>
          <ReportsBlock/>
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
