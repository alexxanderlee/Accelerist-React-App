import React from 'react';
import styled from 'styled-components';
import { IProspect } from 'src/interfaces';
import ProspectCard from './ProspectCard';
import EmptyProspects from './EmptyProspects';

interface Props {
  prospects: IProspect[];
}

const ProspectsList: React.FC<Props> = ({ prospects }) => {
  return (
    prospects.length > 0 ? (
      <Wrapper>
        {prospects.map(prospect => <ProspectCard key={prospect.id} prospect={prospect} />)}
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

export default ProspectsList;
