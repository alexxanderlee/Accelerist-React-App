import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import queryString from 'query-string';
import { AnyAction } from '@reduxjs/toolkit';
import { SearchPageWrapper } from 'src/layouts';
import { Loader, ErrorMessageBox } from 'src/components/ui';
import { ICompany, MetaData, FetchError } from 'src/interfaces';
import { CompanyCard, Pagination } from 'src/components';
import { folderPlusSvg, uploadSvg, emptyCompanySvg } from 'src/assets/icons';
import { useAppSelector, useAppDispatch } from 'src/state/hooks';
import { companiesSelectors, companiesActions } from 'src/state/features/companies';
import { savedListActions } from 'src/state/features/savedList';

const SearchPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const companies: ICompany[] = useAppSelector(companiesSelectors.getCompanies);
  const meta: MetaData = useAppSelector(companiesSelectors.getCompaniesMeta);
  const isLoading: boolean = useAppSelector(companiesSelectors.isLoading);
  const error: FetchError = useAppSelector(companiesSelectors.getError);

  const [isDownloading, setIsDownloading] = React.useState<boolean>(false);
  const { page, ...filters } = queryString.parse(history.location.search);
  const pageNumber = Number(page);

  function onDislike(id: string) {
    dispatch(companiesActions.dislikeCompany(id));
  }

  function onLike(id: string) {
    dispatch(companiesActions.likeCompany(id));
  }

  function handleSaveList() {
    dispatch(savedListActions.createSavedList({ filters, prospectsAvailable: meta.totalItems }))
      .then((action: AnyAction) => {
        if (action.type.endsWith('/fulfilled')) {
          history.push(`/prospects/${action.payload.id}`)
        }
      });
  }

  function handleExportList() {
    setIsDownloading(true);
    dispatch(companiesActions.exportToExcel({ page: pageNumber || 1, limit: 12, filters }))
      .then(() => setIsDownloading(false));
  }

  React.useEffect(() => {
    dispatch(companiesActions.getCompanies({ page: pageNumber || 1, limit: 12, filters }));
  }, [pageNumber]);

  if (error) {
    return (
      <SearchPageWrapper>
        <Root>
          <ErrorMessageBox
            error={error.error}
            message={error.message}
          />
        </Root>
      </SearchPageWrapper>
    );
  }

  if (isLoading || !meta) {
    return (
      <SearchPageWrapper>
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      </SearchPageWrapper>
    );
  }

  return (
    <SearchPageWrapper>
      {companies.length > 0 ? (
        <Root>
          <TotalItems>Found {meta.totalItems} companies</TotalItems>
          <Actions>
            <Buttons>
              <ActionButton
                saveList
                onClick={handleSaveList}
              >Save List</ActionButton>
              <ActionButton
                upload
                onClick={handleExportList}
                disabled={isDownloading}
              >
                {isDownloading ? <Loader width={18} height={18} /> : 'Export to Excel'}
              </ActionButton>
            </Buttons>
            <Pagination
              totalItems={meta.totalItems}
              itemCount={meta.itemCount}
              itemsPerPage={Number(meta.itemsPerPage)}
              currentPage={Number(meta.currentPage)}
            />
          </Actions>
          <Grid>
            {companies.map(company => (
              <CompanyCard
                key={company.id}
                company={company}
                onDislike={() => onDislike(company.id)}
                onLike={() => onLike(company.id)}
              />
            ))}
          </Grid>
        </Root>
      ) : (
        <EmptyListWrapper>
          <EmptyListImg src={emptyCompanySvg} />
          <EmptyListText>No companies</EmptyListText>
        </EmptyListWrapper>
      )}
    </SearchPageWrapper>
  );
};

const Root = styled.div`
  max-width: 1096px;
`;

const LoaderWrapper = styled.div`
  max-width: 1096px;
  height: calc(100vh - 248px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmptyListWrapper = styled.div`
  max-width: 1096px;
  height: calc(100vh - 248px);
  background-color: #FFFFFF;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EmptyListImg = styled.img`
  height: 48px;
  margin-bottom: 30px;
`;

const EmptyListText = styled.p`
  margin: 0;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 145%;
  color: #122434;
`;

const TotalItems = styled.p`
  margin-top: 0;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 145%;
  color: #122434;
`;

const Actions = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
`;

const ActionButton = styled.button<{ saveList?: boolean, upload?: boolean }>`
  padding: 7px 10px 7px 37px;
  position: relative;
  border: none;
  border-radius: 6px;
  background-color: transparent;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #122434;
  cursor: pointer;
  transition: background-color 0.2s;

  &:not(:last-child) {
    margin-right: 27px;
  }

  &::before {
    content: ' ';
    height: 24px;
    width: 24px;
    position: absolute;
    top: 3px;
    left: 5px;
    ${props => props.saveList && `background-image: url(${folderPlusSvg})`}
    ${props => props.upload && `background-image: url(${uploadSvg})`}
  }

  &:not(:disabled):hover {
    background-color: #FFFFFF;
  }

  &:disabled {
    cursor: default;
    background-color: #FFFFFF;
  }
  
  & div {
    margin: 0 20px;
    display: flex;
  }
`;

const Grid = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;
`;

export default SearchPage;
