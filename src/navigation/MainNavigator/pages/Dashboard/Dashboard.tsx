import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MainLayout } from 'src/layouts';
import {
  ReportsBlock,
  ProspectsList,
  FavouritesList,
} from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { teamActions, teamSelectors } from 'src/state/features/team';
import { savedListActions, savedListSelectors } from 'src/state/features/savedList';
import { companiesActions, companiesSelectors } from 'src/state/features/companies';
import { SortTypes } from 'src/constants';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const prospects = useAppSelector(savedListSelectors.getSavedLists);
  const isProspectsLoading = useAppSelector(savedListSelectors.isLoading);
  const isTeamLoading = useAppSelector(teamSelectors.isLoading);
  const isFavouritesLoading = useAppSelector(companiesSelectors.isLoading);


  React.useEffect(() => {
    dispatch(teamActions.getReports());
    dispatch(savedListActions.getSavedLists({ page: 1, limit: 2, sort: SortTypes.Alphabet }));
    dispatch(companiesActions.getFavouriteCompanies({ page: 1, limit: 6 }));
  }, []);

  return (
    <MainLayout
      pageTitle="Dashboard"
      isLoading={isProspectsLoading || isTeamLoading || isFavouritesLoading}
    >
      <Grid>
        <GridTopItem>
          <ItemHeader>
            <ItemTitle>Prospecting Sessions</ItemTitle>
            <ItemLink to="/prospects">see more</ItemLink>
          </ItemHeader>
          <ProspectsList prospects={prospects} />
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
    </MainLayout>
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
