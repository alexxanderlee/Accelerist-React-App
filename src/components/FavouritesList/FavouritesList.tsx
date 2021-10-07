import React from 'react';
import styled from 'styled-components'
import { ICompany } from 'src/interfaces';
import EmptyFavourites from './EmptyFavourites';
import FavouriteItem from './FavouriteItem';

interface FavouritesListProps {
  favourites: ICompany[];
}

const FavouritesList: React.FC<FavouritesListProps> = ({ favourites }) => {
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
