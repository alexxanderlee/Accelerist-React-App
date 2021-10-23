import React from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { AppWrapper } from 'src/layouts';
import { PageBar, Pagination, ProspectsList } from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { savedListActions, savedListSelectors } from 'src/state/features/savedList';
import { IProspect, MetaData, SortType } from 'src/interfaces';

const Prospects: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const prospects: IProspect[] = useAppSelector(savedListSelectors.getSavedLists);
  const meta: MetaData = useAppSelector(savedListSelectors.getMeta);
  const isLoading: boolean = useAppSelector(savedListSelectors.isLoading);

  const { page } = queryString.parse(history.location.search);
  const [sorting, setSorting] = React.useState<SortType>('alphabet');

  React.useEffect(() => {
    dispatch(savedListActions.getSavedLists({ page: Number(page) || 1, limit: 12, sort: sorting }));
  }, [page, sorting]);

  return (
    <AppWrapper
      pageBar={<PageBar pageTitle="Prospecting Sessions" />}
      isLoading={isLoading}
    >
      <Root>
        {meta && meta.totalItems > 0 && (
          <TopBar>
            <SortToggler>
              <SortTogglerTitle>Sort by</SortTogglerTitle>
              <SortTogglerBtn
                active={sorting === 'alphabet'}
                onClick={() => setSorting('alphabet')}
              >Alphabet</SortTogglerBtn>
              <SortTogglerBtn
                active={sorting === 'available'}
                onClick={() => setSorting('available')}
              >Prospects Available</SortTogglerBtn>
              <SortTogglerBtn
                active={sorting === 'last-activity'}
                onClick={() => setSorting('last-activity')}
              >Last Activity</SortTogglerBtn>
            </SortToggler>
            <Pagination
              totalItems={meta.totalItems}
              itemCount={meta.itemCount}
              itemsPerPage={Number(meta.itemsPerPage)}
              currentPage={Number(meta.currentPage)}
            />
          </TopBar>
        )}
        <ProspectsList prospects={prospects} />
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

const TopBar = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
`;

const SortToggler = styled.div`
  display: flex;
`;

const SortTogglerTitle = styled.p`
  margin: 0 26px 0 0;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #737373;
`;

const SortTogglerBtn = styled.div<{ active?: boolean }>`
  margin-right: 22px;
  position: relative;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #122434;
  cursor: pointer;

  &::after {
    content: ' ';
    position: absolute;
    left: 0;
    bottom: -5px;
    display: block;
    background-color: #2BAEE0;
    height: 2px;
    width: 100%;
    opacity: ${props => props.active ? 1 : 0};
    transition: opacity 0.2s;
  }

  &:hover::after {
    opacity: 1;
  }
`;

export default Prospects;
