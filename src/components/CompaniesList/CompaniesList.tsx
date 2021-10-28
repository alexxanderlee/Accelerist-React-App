import React from 'react';
import styled from 'styled-components';
import CompanyCard from './CompanyCard';
import { emptyCompanySvg } from 'src/assets/icons';
import { useAppDispatch } from 'src/state/hooks';
import { companiesActions } from 'src/state/features/companies';
import { ICompany } from 'src/interfaces';
import device from 'src/constants/devices';

interface CompaniesListProps {
  companies: ICompany[];
}

const CompaniesList: React.FC<CompaniesListProps> = ({ companies }) => {
  const dispatch = useAppDispatch();

  function dislikeCompany(id: string) {
    dispatch(companiesActions.dislikeCompany(id));
  }

  function likeCompany(id: string) {
    dispatch(companiesActions.likeCompany(id));
  }

  return (
    companies.length > 0 ? (
      <Grid>
        {companies.map(company => (
          <CompanyCard
            key={company.id}
            company={company}
            dislikeCompany={() => dislikeCompany(company.id)}
            likeCompany={() => likeCompany(company.id)}
          />
        ))}
      </Grid>
    ) : (
      <EmptyListWrapper>
        <EmptyListImg src={emptyCompanySvg} />
        <EmptyListText>No companies</EmptyListText>
      </EmptyListWrapper>
    )
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;

  @media ${device.mobileM} {
    grid-template-columns: 1fr;
    grid-gap: 17px;
  }
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

export default CompaniesList;
