import React from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { AppWrapper } from 'src/layouts';
import { PageBar, Pagination, CompaniesList, Filters, ConfirmModalBox } from 'src/components';
import { Loader, Button } from 'src/components/ui';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { savedListActions, savedListSelectors } from 'src/state/features/savedList';
import { companiesSelectors, companiesActions } from 'src/state/features/companies';
import { IProspect, ICompany, MetaData } from 'src/interfaces';
import { uploadSvg, penIconSvg } from 'src/assets/icons';

interface MatchParams {
  prospectId: string;
}

const Prospect: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  
  const { prospectId } = match.params;
  const { page } = queryString.parse(history.location.search);

  const prospect: IProspect = useAppSelector(state => savedListSelectors.getSavedListById(state, prospectId));
  const isSavedListLoading: boolean = useAppSelector(savedListSelectors.isLoading);
  const companies: ICompany[] = useAppSelector(companiesSelectors.getCompanies);
  const compnaiesMeta: MetaData = useAppSelector(companiesSelectors.getCompaniesMeta);
  const isCompaniesLoading: boolean = useAppSelector(companiesSelectors.isLoading);

  const [inputValue, setInputValue] = React.useState<string>('');
  const [isExporting, setIsExporting] = React.useState<boolean>(false);
  const [isEditable, setIsEditable] = React.useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);

  function handleExportList() {
    setIsExporting(true);
    dispatch(savedListActions.exportToExcel(prospect.id))
      .then(() => setIsExporting(false));
  }

  function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function updateProspectName() {
    if (inputValue.trim()) {
      const payload = {
        ...prospect,
        name: inputValue,
      };
      dispatch(savedListActions.updateSavedList(payload));
    }
  }

  function deleteProspect() {
    dispatch(savedListActions.deleteSavedList(prospect.id)).then((action) => {
      if (action.type.endsWith('/fulfilled')) {
        history.push('/prospects');
      }
    });
  }

  React.useEffect(() => {
    if (!prospect) {
      dispatch(savedListActions.getSavedListById(prospectId));
    }
  }, []);

  React.useEffect(() => {
    if (prospect) {
      dispatch(companiesActions.getCompanies({ page: Number(page) || 1, limit: 12, filters: prospect.filters }));
      setIsEditable(!prospect.name);
    }
  }, [prospect, page]);

  const PageBarInner = (
    <InnerWrapper>
      {isEditable ? (
        <InnerTitleInput
          type="text"
          placeholder="Unnamed"
          value={inputValue}
          onChange={handleChangeInput}
          autoFocus
        />
      ) : (
        <InnerTitle>{prospect?.name}</InnerTitle>
      )}
      <InnerButtons>
        {isEditable ? (
          <InnerButtons>
            <PrimaryBtnWrapper>
              <Button
                type="button"
                variant="OutlinedPrimary"
                text="Save"
                onClick={updateProspectName}
              />
            </PrimaryBtnWrapper>
            <Button
              type="button"
              variant="OutlinedDanger"
              text="Cancel"
              onClick={() => setIsEditable(false)}
              disabled={!prospect?.name}
            />
          </InnerButtons>
        ) : (
          <InnerButtons>
            <PrimaryBtnWrapper>
              <Button
                type="button"
                variant="OutlinedPrimary"
                text="Edit"
                icon={penIconSvg}
                onClick={() => {
                  setInputValue(prospect.name ?? '');
                  setIsEditable(true);
                }}
              />
            </PrimaryBtnWrapper>
            <Button
              type="button"
              variant="OutlinedDanger"
              text="Delete"
              onClick={() => setIsModalVisible(true)}
            />
          </InnerButtons>
        )}
      </InnerButtons>
    </InnerWrapper>
  );

  return (
    <AppWrapper
      pageBar={<PageBar inner={PageBarInner} />}
      isLoading={isSavedListLoading || isCompaniesLoading}
    >
      <Root>
        {isModalVisible && (
          <ConfirmModalBox
            title="Delete saved list"
            descr="Are you sure you want to delete the saved list?"
            confirmButtonText="Delete"
            onClose={() => setIsModalVisible(false)}
            onCancel={() => setIsModalVisible(false)}
            onConfirm={deleteProspect}
          />
        )}
        {prospect && compnaiesMeta && compnaiesMeta.totalItems > 0 && (
          <>
            <TotalItems>{compnaiesMeta?.totalItems} companies</TotalItems>
            <Filters filters={prospect.filters} />
            <TopBar>
              <ExportButton
                onClick={handleExportList}
                disabled={isExporting}
              >
                {isExporting ? <Loader width={18} height={18} /> : 'Export to Excel'}
              </ExportButton>
              <Pagination
                totalItems={compnaiesMeta.totalItems}
                itemCount={compnaiesMeta.itemCount}
                itemsPerPage={Number(compnaiesMeta.itemsPerPage)}
                currentPage={Number(compnaiesMeta.currentPage)}
              />
            </TopBar>
          </>
        )}
        <CompaniesList companies={companies} />
      </Root>
    </AppWrapper>
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
`;

const TopBar = styled.div`
  margin-top: 16px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
`;

const ExportButton = styled.button`
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
    background-image: url(${uploadSvg});
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

const InnerWrapper = styled.div`
  width: 100%;
  max-width: 1096px;
  display: flex;
  justify-content: space-between;
`;

const InnerTitle = styled.h1`
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 32px;
  line-height: 150%;
  color: #122434;
`;

const InnerTitleInput = styled.input`
  padding: 0;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 32px;
  line-height: 150%;
  color: #122434;
  outline: none;
  border: none;
`;

const InnerButtons = styled.div`
  display: flex;
  align-items: center;
`;

const PrimaryBtnWrapper = styled.div`
  margin-right: 8px;
`;

export default Prospect;
