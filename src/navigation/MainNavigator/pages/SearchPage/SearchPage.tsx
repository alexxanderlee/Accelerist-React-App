import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import queryString from 'query-string';
import { AnyAction } from '@reduxjs/toolkit';
import { MainLayout } from 'src/layouts';
import { ICompany, MetaData } from 'src/interfaces';
import { Loader } from 'src/components/ui';
import { Pagination, SearchBar, CompaniesList } from 'src/components';
import { folderPlusSvg, uploadSvg } from 'src/assets/icons';
import { useAppSelector, useAppDispatch } from 'src/state/hooks';
import { companiesSelectors, companiesActions } from 'src/state/features/companies';
import { savedListActions } from 'src/state/features/savedList';
import device from 'src/constants/devices';

const SearchPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const companies: ICompany[] = useAppSelector(companiesSelectors.getCompanies);
  const meta: MetaData = useAppSelector(companiesSelectors.getCompaniesMeta);
  const isLoading: boolean = useAppSelector(companiesSelectors.isLoading);

  const [isExporting, setIsExporting] = React.useState<boolean>(false);
  const { page, ...filters } = queryString.parse(history.location.search);

  function handleSaveList() {
    dispatch(savedListActions.createSavedList({ filters, prospectsAvailable: meta.totalItems }))
      .then((action: AnyAction) => {
        if (action.type.endsWith('/fulfilled')) {
          history.push(`/prospects/${action.payload.id}`)
        }
      });
  }

  function handleExportList() {
    setIsExporting(true);
    dispatch(companiesActions.exportToExcel({ page: Number(page) || 1, limit: 12, filters }))
      .then(() => setIsExporting(false));
  }

  React.useEffect(() => {
    dispatch(companiesActions.getCompanies({ page: Number(page) || 1, limit: 12, filters }));
  }, [page]);

  return (
    <MainLayout
      subheader={<SearchBar />}
      isLoading={isLoading}
    >
      <Root>
        <TotalItems>Found {meta?.totalItems} companies</TotalItems>
        {meta && meta.totalItems > 0 && (
          <TopBar>
            <Buttons>
              <ActionButton
                saveList
                onClick={handleSaveList}
              >Save List</ActionButton>
              <ActionButton
                upload
                onClick={handleExportList}
                disabled={isExporting}
              >
                {isExporting ? <Loader width={18} height={18} /> : 'Export to Excel'}
              </ActionButton>
            </Buttons>
            <TopPagination>
              <Pagination
                totalItems={meta.totalItems}
                itemCount={meta.itemCount}
                itemsPerPage={Number(meta.itemsPerPage)}
                currentPage={Number(meta.currentPage)}
              />
            </TopPagination>
          </TopBar>
        )}
        <CompaniesList companies={companies} />
        {!!meta?.totalItems && (
          <BottomPagination>
            <Pagination
              totalItems={meta.totalItems}
              itemCount={meta.itemCount}
              itemsPerPage={Number(meta.itemsPerPage)}
              currentPage={Number(meta.currentPage)}
            />
          </BottomPagination>
        )}
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
  margin-top: 0;
  margin-bottom: 24px;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 145%;
  color: #122434;

  @media ${device.mobileM} {
    margin-bottom: 16px;
    font-weight: 400;
    font-size: 12px;
  }
`;

const TopBar = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;

  @media ${device.mobileM} {
    margin-bottom: 16px;
  }
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

  @media ${device.mobileM} {
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
`;

const TopPagination = styled.div`
  @media ${device.mobileM} {
    display: none;
  }
`;

const BottomPagination = styled.div`
  display: none;
  margin-top: 16px;
  justify-content: center;

  @media ${device.mobileM} {
    display: flex;
  }
`;

export default SearchPage;
