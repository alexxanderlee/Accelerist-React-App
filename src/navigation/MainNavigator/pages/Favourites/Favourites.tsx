import React from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { MainLayout } from 'src/layouts';
import { Pagination, CompaniesList } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { companiesActions, companiesSelectors } from 'src/state/features/companies';
import { ICompany, MetaData } from 'src/interfaces';

const Favourites: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const companies: ICompany[] = useAppSelector(companiesSelectors.getFavourites);
  const meta: MetaData = useAppSelector(companiesSelectors.getFavouritesMeta);
  const isLoading: boolean = useAppSelector(companiesSelectors.isLoading);

  const { page } = queryString.parse(history.location.search);

  React.useEffect(() => {
    dispatch(companiesActions.getFavouriteCompanies({ page: Number(page) || 1, limit: 12 }));
  }, [page]);

  return (
    <MainLayout
      pageTitle="Favourites"
      isLoading={isLoading}
    >
      <Root>
        {meta && meta.totalItems > 0 && (
          <TopBar>
            <TotalItems>{meta?.totalItems} companies</TotalItems>
            <Pagination
              totalItems={meta.totalItems}
              itemCount={meta.itemCount}
              itemsPerPage={Number(meta.itemsPerPage)}
              currentPage={Number(meta.currentPage)}
            />
          </TopBar>
        )}
        <CompaniesList companies={companies} />
      </Root>
    </MainLayout>
  );
};

const Root = styled.div`
  max-width: 1096px;
  min-height: calc(100vh - 248px);
  display: flex;
  flex-direction: column;
`;

const TotalItems = styled.p`
  margin: 0;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 145%;
  color: #122434;
`;

const TopBar = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
`;

export default Favourites;
