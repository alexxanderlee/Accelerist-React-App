import React from 'react';
import styled from 'styled-components'
import { ICompany } from 'src/interfaces';
import EmptyFavourites from './EmptyFavourites';
import FavouriteItem from './FavouriteItem';
import { useAppSelector } from 'src/state/hooks';
import { companiesSelectors } from 'src/state/features/companies';

const FavouritesList: React.FC = () => {
  const favourites: ICompany[] = useAppSelector(companiesSelectors.getFavourites);

  return (
    favourites.length > 0 ? (
      <ListWrapper>
        {favourites.map(company => <FavouriteItem key={company.id} company={company} />)}
      </ListWrapper>
    ) : (
      <EmptyFavourites />
    )
  );
};

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 24px;
  grid-row-gap: 15px;
`;

export default FavouritesList;
