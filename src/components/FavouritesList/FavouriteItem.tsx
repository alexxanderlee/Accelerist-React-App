import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { ICompany } from 'src/interfaces';
import { emptyCompanySvg } from 'src/assets/icons';

interface FavouriteItemProps {
  company: ICompany
}

const FavouriteItem: React.FC<FavouriteItemProps> = ({ company: { id, name, logo, score, crsFocus } }) => {
  return (
    <Card>
      <Top>
        {logo ? <LogoImg src={logo} /> : <EmptyLogo><SvgImg src={emptyCompanySvg} /></EmptyLogo>}
        <CompanyInfo>
          <CompanyName to={`/company/${id}`}>{name}</CompanyName>
          <Text>Prioroty Ranking {score}</Text>
        </CompanyInfo>
      </Top>
      <Bottom>
        <Text>CSR Focus</Text>
        <CsrList>
          {crsFocus.length > 0
            ? crsFocus.map((csr, index) => <CsrItem key={index}>{csr}</CsrItem>)
            : <CsrItem>No Information</CsrItem>
          }
        </CsrList>
      </Bottom>
    </Card>
  );
};

const Card = styled.div`
  padding: 24px;
  background-color: #FFFFFF;
  border-radius: 6px;
`;

const Top = styled.div`
  display: flex;
`;

const Bottom = styled.div`
  margin-top: 20px;
`;

const LogoImg = styled.img`
  width: 48px;
  height: 48px;
  border: 1px solid #E8E8E8;
  border-radius: 6px;
`;

const EmptyLogo = styled.div`
  width: 48px;
  height: 48px;
  border: 1px solid #E8E8E8;
  border-radius: 6px;
  background-color: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const SvgImg = styled.img`
  height: 22px;
`;

const CompanyInfo = styled.div`
  margin-left: 12px;
`;

const CompanyName = styled(Link)`
  display: inline-block;
  max-width: 140px;
  margin-top: 4px;
  margin-bottom: 4px;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
  color: #122434;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Text = styled.p`
  margin: 0;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #737373;
`;

const CsrList = styled.ul`
  margin-bottom: 0;
  margin-top: 4px;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
`;

const CsrItem = styled.li`
  position: relative;
  margin-right: 16px;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
  color: #122434;

  &::after {
    content: ' ';
    position: absolute;
    right: -10px;
    top: 7px;
    width: 4px;
    height: 4px;
    background-color: #C4C4C4;
    border-radius: 50%;
  }

  &:last-child {
    margin-right: 0;
  }

  &:last-child::after {
    display: none;
  }
`;

export default FavouriteItem;
