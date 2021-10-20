import React from 'react';
import styled from 'styled-components'
import { ICompany } from 'src/interfaces';
import EmptyFavourites from './EmptyFavourites';
import FavouriteItem from './FavouriteItem';
import { useAppSelector } from 'src/state/hooks';
import { companiesSelectors } from 'src/state/features/companies';
import { Loader } from 'src/components/ui';

const FavouritesList: React.FC = () => {
  const favourites: ICompany[] = useAppSelector(companiesSelectors.getFavourites);
  const isLoading = useAppSelector(companiesSelectors.isLoading);

  if (isLoading) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  }

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

const LoaderWrapper = styled.div`
  padding: 70px 0;
  background-color: #FFFFFF;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default FavouritesList;
