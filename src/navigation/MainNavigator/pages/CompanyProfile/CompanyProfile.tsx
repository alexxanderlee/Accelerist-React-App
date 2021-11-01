import React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { MainLayout } from 'src/layouts';
import { LikeButton } from 'src/components/ui';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { companiesActions, companiesSelectors } from 'src/state/features/companies';
import { ICompany } from 'src/interfaces';
import { emptyCompanySvg, MapPinIcon, GlobeIcon, PhoneIcon } from 'src/assets/icons';
import formatMoney from 'src/utils/moneyFormatter';
import { getFullCompanyAddress } from 'src/utils/getCompanyAddress';
import Description from './Description';

interface MatchParams {
  companyId: string;
}

const CompanyProfile: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const dispatch = useAppDispatch();
  const { companyId } = match.params;
  const company: ICompany = useAppSelector(state => companiesSelectors.getCompanyById(state, companyId));
  const isLoading: boolean = useAppSelector(companiesSelectors.isLoading);

  function onClickLike() {
    company.like
      ? dispatch(companiesActions.dislikeCompany(companyId))
      : dispatch(companiesActions.likeCompany(companyId));
  }

  React.useEffect(() => {
    if (!company) {
      dispatch(companiesActions.getCompanyById(companyId));
    }
  }, []);

  return (
    <MainLayout
      pageTitle="Corporate Profile"
      enableBackBtn={true}
      isLoading={isLoading}
    >
      {company && (
        <Root>
          <ProfileHeader>
            {company.logo
              ? <CompanyLogo style={{ backgroundImage: `url(${company.logo})` }} />
              : <CompanyLogo><EmptyCompanyImg src={emptyCompanySvg} /></CompanyLogo>
            }
            <HeaderInfo>
              <HeaderRow>
                <CompanyName>{company.name}</CompanyName>
                <LikeButton
                  iconOnly={true}
                  liked={company.like}
                  onClick={onClickLike}
                />
              </HeaderRow>
              <HeaderCSRFocus>
                {company.crsFocus.length > 0
                  ? company.crsFocus.join(', ')
                  : 'No Information'
                }
              </HeaderCSRFocus>
            </HeaderInfo>
          </ProfileHeader>
          <ProfileBody>
            <ProfileContent>
              <Title>Business Description Products</Title>
              <Subtitle>Description</Subtitle>
              {company.descriptionList && company.descriptionList.length > 300
                ? <Description description={company.descriptionList} />
                : <Paragraph>{company.descriptionList}</Paragraph>
              }
              <Subtitle>Reported</Subtitle>
              <Table>
                <TableCell>
                  <TableCellName>Revenue Reported</TableCellName>
                  <TableCellValue>{formatMoney(company.revenue ?? 0) ?? '-'}</TableCellValue>
                </TableCell>
                <TableCell>
                  <TableCellName>Employees Reported</TableCellName>
                  <TableCellValue>{company.employeeCount ?? '-'}</TableCellValue>
                </TableCell>
              </Table>
              <Subtitle>Company Ticker</Subtitle>
              <Ticker>{company.ticker || 'No Information'}</Ticker>
              <Subtitle>Company Contacts</Subtitle>
              <Contacts>
                <ContactsRow>
                  <ContactsItem>
                    <GlobeIcon />
                    <a href={`http://${company.website}`} target="_blank" rel="noreferrer">{company.website}</a>
                  </ContactsItem>
                  <ContactsItem>
                    <PhoneIcon />
                    <a href={`tel:${company.phone}`}>{company.phone}</a>
                  </ContactsItem>
                </ContactsRow>
                <ContactsItem>
                  <MapPinIcon />
                  <p>{getFullCompanyAddress(company)}</p>
                </ContactsItem>
              </Contacts>
              <Title>Social Impact</Title>
              <SocialImpactSection>
                <SocialImpactColumn>
                  <Subtitle>Type of Investment</Subtitle>
                  <ListWrapper>
                    <List>
                      {company.typesOfInvestment && company.typesOfInvestment.length > 0
                        ? company.typesOfInvestment.map(item => <ListItem key={item}>{item}</ListItem>)
                        : <ListItem>No Information</ListItem>
                      }
                    </List>
                  </ListWrapper>
                </SocialImpactColumn>
                <SocialImpactColumn>
                  <Subtitle>CRS Focus</Subtitle>
                  <ListWrapper>
                    <List>
                      {company.typesOfInvestment && company.typesOfInvestment.length > 0
                        ? company.typesOfInvestment.map(item => <ListItem key={item}>{item}</ListItem>)
                        : <ListItem>No Information</ListItem>
                      }
                    </List>
                  </ListWrapper>
                </SocialImpactColumn>
              </SocialImpactSection>
              <Title>SDG Goal Alignment</Title>
              <NoGoals>No selected goal</NoGoals>
              <Subtitle>Contributions</Subtitle>
              <Table>
                <TableCell>
                  <TableCellName>Cash Contributions</TableCellName>
                  <TableCellValue>{company.cashContributions ?? '-'}</TableCellValue>
                </TableCell>
                <TableCell>
                  <TableCellName>Employee Contributions</TableCellName>
                  <TableCellValue>{company.employeeContributions ?? '-'}</TableCellValue>
                </TableCell>
                <TableCell>
                  <TableCellName>Total Social Contributions</TableCellName>
                  <TableCellValue>{company.annualContributions ?? '-'}</TableCellValue>
                </TableCell>
                <TableCell>
                  <TableCellName>In-Kind Contributions</TableCellName>
                  <TableCellValue>{company.inKindContributions ?? '-'}</TableCellValue>
                </TableCell>
              </Table>
              <Subtitle>Charitable Partners</Subtitle>
              <ListWrapper>
                <List>
                  {company.charitablePartners && company.charitablePartners.length > 0
                    ? company.charitablePartners.map(item => <ListItem key={item}>{item}</ListItem>)
                    : <ListItem>No Information</ListItem>
                  }
                </List>
              </ListWrapper>
            </ProfileContent>
            <ProfileSidebar />
          </ProfileBody>
        </Root>
      )}
    </MainLayout>
  );
};

const Root = styled.div`
  max-width: 1096px;
`;

const ProfileHeader = styled.div`
  padding: 40px;
  background-color: #F2F2F2;
  border-radius: 6px 6px 0px 0px;
  display: flex;
`;

const ProfileBody = styled.div`
  display: flex;
  background-color: #FFFFFF;
  border-radius: 0px 0px 6px 6px;
`;

const ProfileContent = styled.div`
  flex: 2;
  padding: 32px 40px 40px 40px;
`;

const ProfileSidebar = styled.div`
  flex: 1;
  padding: 32px 40px 40px 40px;
  border-left: 1px solid #EBEBEB;
`;

const CompanyLogo = styled.div`
  width: 100px;
  height: 100px;
  background-color: #FFFFFF;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const EmptyCompanyImg = styled.img`
  height: 48px;
`;

const HeaderInfo = styled.div`
  flex: 1;
  margin-left: 24px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
`;

const CompanyName = styled.h2`
  margin: 0;
  margin-right: 8px;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 148%;
  color: #122434;
`;

const HeaderCSRFocus = styled.p`
  margin-bottom: 0;
  margin-top: 4px;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #737373;
`;

const Title = styled.h4`
  margin-top: 0;
  margin-bottom: 24px;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 148%;
  color: #122434;
`;

const Subtitle = styled.h5`
  margin-top: 0;
  margin-bottom: 16px;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 145%;
  color: #122434;
`;

const Paragraph = styled.p`
  margin-top: 0;
  margin-bottom: 24px;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 155%;
  color: #122434;
`;

const TableCell = styled.div`
  padding: 16px;
  text-align: center;
`;

const Table = styled.div`
  margin-bottom: 32px;
  border: 1px solid #E8E8E8;
  border-radius: 6px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: #FFFFFF;

  ${TableCell}:nth-child(2n+1) {
    border-right: 1px solid #EBEBEB;
  }

  ${TableCell}:nth-child(n+3) {
    border-top: 1px solid #EBEBEB;
  }
`;

const TableCellName = styled.p`
  margin: 0;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #737373;
`;

const TableCellValue = styled.p`
  margin-top: 4px;
  margin-bottom: 0;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 145%;
  color: #122434;
`;

const Ticker = styled.div`
  margin-bottom: 32px;
  display: inline-block;
  padding: 24px;
  border: 1px solid #E8E8E8;
  border-radius: 6px;
  background-color: #FFFFFF;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 148%;
  color: #122434;
`;

const Contacts = styled.div`
  margin-bottom: 50px;
  padding: 20px;
  border: 1px solid #E8E8E8;
  border-radius: 6px;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContactsItem = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #122434;

  a {
    margin-left: 10px;
    text-decoration: none;
    color: #122434;

    &:hover {
      text-decoration: underline;
    }
  }

  p {
    margin: 0;
    margin-left: 10px;
  }
`;

const ContactsRow = styled.div`
  display: flex;
  margin-bottom: 15px;
  
  ${ContactsItem}:not(:last-child) {
    margin-right: 25px;
  }
`;

const SocialImpactSection = styled.div`
  margin-bottom: 32px;
  display: flex;
`;

const SocialImpactColumn = styled.div`
  flex: 1;
  &:not(:last-child) {
    margin-right: 24px;
  }
`;

const ListWrapper = styled.div`
  padding: 24px;
  border: 1px solid #E8E8E8;
  background-color: #FFFFFF;
  border-radius: 6px;
`;

const List = styled.ul`
  margin: 0;
  padding-left: 14px;
  list-style: none;
`;

const ListItem = styled.li`
  position: relative;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 155%;
  color: #122434;

  &:not(:first-child) {
    margin-top: 12px;
  }

  &::before {
    content: ' ';
    display: block;
    width: 6px;
    height: 6px;
    position: absolute;
    top: 8px;
    left: -15px;
    background-color: #2BAEE0;
    border-radius: 50%;
  }
`;

const NoGoals = styled.div`
  display: inline-block;
  margin-bottom: 32px;
  padding: 20px 15px;
  width: 112px;
  height: 112px;
  background: rgb(242, 242, 242);
  border-radius: 6px;
  font-weight: 500;
  font-size: 16px;
  line-height: 145%;
  text-align: center;
`;

export default CompanyProfile;
