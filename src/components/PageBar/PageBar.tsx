import React from 'react';
import styled from 'styled-components';

interface PageBarProps {
  pageTitle?: string;
  inner?: React.ReactNode;
}

const PageBar: React.FC<PageBarProps> = ({ pageTitle, inner }) => {
  return (
    <Bar>
      <Wrapper>
        {inner ? inner : <PageTitle>{pageTitle}</PageTitle>}
      </Wrapper>
    </Bar>
  );
};

const Bar = styled.div`
  background-color: #FFFFFF;
  height: 96px;
`;

const Wrapper = styled.div`
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
`;

export default PageBar;
