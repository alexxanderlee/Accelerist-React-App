import React from 'react';
import styled from 'styled-components';
import { Header } from 'src/components';

interface ContentWrapperProps {
  pageTitle?: string
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ children, pageTitle }) => {
  return (
    <>
      <Header />
      <Subheader>
        <SubheaderWrapper>
          <PageTitle>{pageTitle}</PageTitle>
        </SubheaderWrapper>
      </Subheader>
      <Content>
        <Container>
          {children}
        </Container>
      </Content>
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
  justify-content: space-between;
`;

const PageTitle = styled.h1`
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 32px;
  line-height: 150%;
  color: #122434;
`;

const Content = styled.div`
  background-color: #F9F9F9;
  min-height: calc(100% - 176px);
`;

const Container = styled.div`
  max-width: 1340px;
  padding: 0 20px 40px 20px;
  margin: 0 auto;
`;

export default ContentWrapper;
