import React from 'react';
import styled from 'styled-components';
import { Header } from 'src/components';
import { SearchForm } from 'src/components/forms';
const SearchPageWrapper: React.FC = ({ children }) => {

  return (
    <>
      <Header searchInputVisible={false} />
      <SearchForm />
      <Content>
        <Container>
          {children}
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

export default SearchPageWrapper;
