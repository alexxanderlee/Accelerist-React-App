import React from 'react';
import styled from 'styled-components';
import { IProspect } from 'src/interfaces';
import { ProspectItem } from 'src/components';
import EmptyProspects from './EmptyProspects';
import { useAppSelector } from 'src/state/hooks';
import { savedListSelectors } from 'src/state/features/savedList';
import { Loader } from 'src/components/ui';

const ProspectsList: React.FC = () => {
  const prospects: IProspect[] = useAppSelector(savedListSelectors.getSavedLists);
  const isLoading = useAppSelector(savedListSelectors.isLoading);

  if (isLoading) {
    return (
      <LoadingWrapper>
        <Loader />
      </LoadingWrapper>
    );
  }

  return (
    prospects.length > 0 ? (
      <Wrapper>
        {prospects.map(prospect => <ProspectItem key={prospect.id} prospect={prospect} />)}
      </Wrapper>
    ) : (
      <EmptyProspects />
    )
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;
`;

const LoadingWrapper = styled.div`
  padding: 70px 0;
  background-color: #FFFFFF;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default ProspectsList;
