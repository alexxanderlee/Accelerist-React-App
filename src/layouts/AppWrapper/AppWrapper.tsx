import React from 'react';
import styled from 'styled-components';
import { Header } from 'src/components';
import { Loader } from 'src/components/ui';

interface AppWrapperProps {
  isLoading?: boolean;
  pageBar?: React.ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children, isLoading, pageBar }) => {
  return (
    <>
      <Header />
      {pageBar}
      <Content>
        <Container>
          {isLoading
            ? <LoaderWrapper>
                <Loader />
              </LoaderWrapper>
            : children
          }
        </Container>
      </Content>
    </>
  );
};

const Content = styled.div`
  background-color: #F9F9F9;
  min-height: calc(100vh - 176px);
`;

const Container = styled.div`
  max-width: 1340px;
  padding: 32px 20px 40px 20px;
  margin: 0 auto;
`;

const LoaderWrapper = styled.div`
  max-width: 1096px;
  min-height: calc(100vh - 248px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default AppWrapper;
