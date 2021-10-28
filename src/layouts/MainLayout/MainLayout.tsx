import React from 'react';
import styled from 'styled-components';
import { Header } from 'src/components';
import { Loader } from 'src/components/ui';
import { useHistory } from 'react-router-dom';
import { ChevronDownSvg } from 'src/assets/icons';
import device from 'src/constants/devices';

interface AppWrapperProps {
  isLoading?: boolean;
  subheader?: React.ReactNode;
  pageTitle?: string;
  subheaderContent?: React.ReactNode;
  enableBackBtn?: boolean;
}

const AppWrapper: React.FC<AppWrapperProps> = ({
  children,
  isLoading,
  subheader,
  pageTitle,
  enableBackBtn,
  subheaderContent
}) => {
  const history = useHistory();
  
  return (
    <>
      <Header />
      {subheader
        ? subheader
        : <Subheader>
            <SubheaderWrapper>
              {enableBackBtn && (
                <BackButton onClick={() => history.goBack()}>
                  <ChevronDownSvg width={19} height={11} />
                </BackButton>
              )}
              {subheaderContent ? subheaderContent : <PageTitle>{pageTitle}</PageTitle>}
            </SubheaderWrapper>
          </Subheader>
      }
      <Body>
        <Container>
          {isLoading
            ? <LoaderWrapper>
                <Loader />
              </LoaderWrapper>
            : children
          }
        </Container>
      </Body>
    </>
  );
};

const Subheader = styled.div`
  background-color: #FFFFFF;
  height: 96px;
`;

const SubheaderWrapper = styled.div`
  max-width: 1340px;
  height: 100%;
  padding: 0 20px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const PageTitle = styled.h1`
  margin-right: 82px;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 32px;
  line-height: 150%;
  color: #122434;

  @media ${device.tablet} {
    font-size: 28px;
    margin-right: 32px;
  }
`;

const BackButton = styled.div`
  margin-right: 23px;
  transform: rotate(90deg);
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

const Body = styled.div`
  background-color: #F9F9F9;
  min-height: calc(100vh - 176px);
`;

const Container = styled.div`
  max-width: 1340px;
  padding: 32px 20px 40px 20px;
  margin: 0 auto;

  @media ${device.mobileM} {
    padding: 20px 16px 24px 16px
  }
`;

const LoaderWrapper = styled.div`
  max-width: 1096px;
  min-height: calc(100vh - 248px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default AppWrapper;
