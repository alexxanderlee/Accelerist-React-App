import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ICompany } from 'src/interfaces';
import { emptyCompanySvg } from 'src/assets/icons';
import formatMoney from 'src/utils/moneyFormatter';
import { getFullCompanyAddress } from 'src/utils/getCompanyAddress';
import { Button, LikeButton } from 'src/components/ui';
import device from 'src/constants/devices';

interface CompanyCardProps {
  company: ICompany;
  dislikeCompany: () => void;
  likeCompany: () => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, dislikeCompany, likeCompany }) => {
  const history = useHistory();
  const fullAddress = getFullCompanyAddress(company);
  const revenue = company.revenue ? formatMoney(company.revenue) : '-';

  function onClickLike() {
    company.like ? dislikeCompany() : likeCompany();
  }

  return (
    <Card>
      <LeftSide>
        {company.logo
          ? <CompanyLogo style={{ backgroundImage: `url(${company.logo})` }} />
          : <CompanyLogo><SvgImg src={emptyCompanySvg} /></CompanyLogo>
        }
        <PriorityRanking>
          <PriorityRankingText>Priority Ranking</PriorityRankingText>
          <PriorityRankingValue>{company.score}</PriorityRankingValue>
        </PriorityRanking>
      </LeftSide>
      <RightSide>
        <MainInfo>
          <CompanyName>{company.name}</CompanyName>
          <CompanyAddress>{fullAddress}</CompanyAddress>
          <PhoneNumber>{company.phone}</PhoneNumber>
        </MainInfo>
        <SecondaryInfo>
          <CSRFocus>
            <Text>CSRFocus</Text>
            {company.crsFocus.length > 0
              ? <CSR>{company.crsFocus.join(' · ')}</CSR>
              : <CSR>No Information</CSR>
            }
          </CSRFocus>
          <Revenue>
            <Text>Revenue</Text>
            <BoldText>{revenue}</BoldText>
          </Revenue>
        </SecondaryInfo>
      </RightSide>
      <Buttons>
        <LikeButton
          liked={company.like}
          customStyle={'margin-right: 8px'}
          onClick={onClickLike}
        />
        <Button
          text="Profile"
          type="button"
          variant="OutlinedPrimary"
          customStyle={'flex: 1'}
          onClick={() => history.push(`/company/${company.id}`)}
        />
      </Buttons>
    </Card>
  );
};

const Card = styled.div`
  position: relative;
  padding: 26px;
  background-color: #FFFFFF;
  border-radius: 6px;
  display: grid;
  grid-template-columns: 184px auto;

  @media ${device.laptop} {
    padding: 24px 16px;
    grid-template-columns: 140px auto;
  }

  @media ${device.tabletXS} {
    grid-template-columns: 185px auto;
  }

  @media ${device.mobileL} {
    grid-template-columns: 140px auto;
  }
`;

const LeftSide = styled.div`
  width: 168px;
  margin-right: 16px;
  border: 1px solid #E8E8E8;
  border-radius: 6px;
  grid-row: 1/3;

  @media ${device.laptop} {
    width: 124px;
    grid-row: 1/2;
  }

  @media ${device.tabletXS} {
    width: 168px;
    grid-row: 1/3;
  }

  @media ${device.mobileL} {
    width: 124px;
    grid-row: 1/2;
  }
`;

const CompanyLogo = styled.div`
  height: 156px;
  border-bottom: 1px solid #E8E8E8;
  border-radius: 6px 6px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media ${device.laptop} {
    height: 124px;
  }

  @media ${device.tabletXS} {
    height: 156px;
  }

  @media ${device.mobileL} {
    height: 124px;
  }
`;

const SvgImg = styled.img`
  height: 48px;
`;

const PriorityRanking = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PriorityRankingText = styled.p`
  margin: 0;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #737373;
`;

const PriorityRankingValue = styled.p`
  margin-bottom: 0;
  margin-top: 2px;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 145%;
  color: #122434;
`;

const RightSide = styled.div`
  width: 100%;
  height: 157px;
  display: flex;
  flex-direction: column;

  @media ${device.laptop} {
    height: 184px;
  }

  @media ${device.tabletXS} {
    height: 157px;
  }

  @media ${device.mobileL} {
    height: 184px;
  }
`;

const MainInfo = styled.div`
  flex: 1;
`;

const CompanyName = styled.p`
  margin: 0;
  max-width: 290px;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 145%;
  color: #122434;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  @media ${device.tabletL} {
    max-width: 120px;
  }
`;

const CompanyAddress = styled.p`
  margin-bottom: 0;
  margin-top: 8px;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #737373;
`;

const PhoneNumber = styled.p`
  margin-bottom: 0;
  margin-top: 4px;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #737373;
`;

const SecondaryInfo = styled.div`
  margin-top: 16px;
  border-bottom: 1px solid #E8E8E8;
  display: flex;

  @media ${device.tabletL} {
    margin-top: 7px;
    flex-direction: column;
    border-bottom: none;
  }

  @media ${device.tabletXS} {
    flex-direction: row;
    border-bottom: 1px solid #E8E8E8;
  }

  @media ${device.mobileL} {
    flex-direction: column;
    border-bottom: none;
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

const BoldText = styled.p`
  margin: 0;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
  color: #122434;
`;

const CSRFocus = styled.div`
  flex: 1;
  padding-bottom: 12px;
  padding-right: 18px;
  border-right: 1px solid #E8E8E8;

  @media ${device.tabletL} {
    border-right: none;
    padding: 0;
  }

  @media ${device.tabletXS} {
    padding-bottom: 12px;
    padding-right: 18px;
    border-right: 1px solid #E8E8E8;
  }

  @media ${device.mobileL} {
    border-right: none;
    padding: 0;
  }
`;

const CSR = styled.p`
  margin-bottom: 0;
  margin-top: 4px;
  margin-right: 16px;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
  color: #122434;
  max-width: 175px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Revenue = styled.div`
  flex: 1;
  padding-bottom: 12px;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  p:last-child {
    margin-top: 4px;
  }

  @media ${device.tabletL} {
    padding: 0;
    margin-top: 14px;
    flex-direction: row;
    justify-content: space-between;
    align-items: unset;

    p:last-child {
      margin-top: 0;
    }
  }

  @media ${device.tabletXS} {
    margin-top: 0;
    padding-bottom: 12px;
    padding-left: 18px;
    flex-direction: column;
    align-items: flex-end;
  }

  @media ${device.mobileL} {
    padding: 0;
    margin-top: 14px;
    flex-direction: row;
    align-items: unset;
  }
`;

const Buttons = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: flex-end;

  @media ${device.laptop} {
    margin-top: 16px;
    grid-column: 1/3;
  }

  @media ${device.tabletXS} {
    margin-top: 20px;
    grid-column: 2/3;
  }

  @media ${device.mobileL} {
    margin-top: 16px;
    grid-column: 1/3;
  }
`;

export default CompanyCard;
