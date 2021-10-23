import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ICompany } from 'src/interfaces';
import { emptyCompanySvg } from 'src/assets/icons';
import formatMoney from 'src/utils/moneyFormatter';
import { Button, LikeButton } from 'src/components/ui';

interface CompanyCardProps {
  company: ICompany;
  onDislike: () => void;
  onLike: () => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, onDislike, onLike }) => {
  const history = useHistory();

  const fullAddress = [company.street, company.city, company.state, company.country, company.zipCode]
    .reduce((acc, value) => value ? `${acc} ${value}` : acc, '');

  const revenue = company.revenue ? formatMoney(company.revenue) : '-';

  function hanldeLike() {
    company.like ? onDislike() : onLike();
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
        <MiddleBlock>
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
        </MiddleBlock>
        <Buttons>
          <LikeButton
            liked={company.like}
            customStyle={'margin-right: 8px'}
            onClick={hanldeLike}
          />
          <Button
            text="Profile"
            type="button"
            variant="OutlinedPrimary"
            customStyle={'flex: 1'}
            onClick={() => history.push(`/company/${company.id}`)}
          />
        </Buttons>
      </RightSide>
    </Card>
  );
};

const Card = styled.div`
  padding: 26px;
  background-color: #FFFFFF;
  border-radius: 6px;
  display: flex;
`;

const LeftSide = styled.div`
  width: 168px;
  margin-right: 16px;
  border: 1px solid #E8E8E8;
  border-radius: 6px;
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
  flex: 1;
  display: flex;
  flex-direction: column;
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

const MiddleBlock = styled.div`
  margin-top: 16px;
  border-bottom: 1px solid #E8E8E8;
  display: flex;
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
`;

const Buttons = styled.div`
  margin-top: 20px;
  display: flex;
`;

export default CompanyCard;
