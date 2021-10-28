import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { ChevronDownSvg } from 'src/assets/icons';

interface PageBarProps {
  pageTitle?: string;
  inner?: React.ReactNode;
  enableBackBtn?: boolean;
}

const PageBar: React.FC<PageBarProps> = ({ pageTitle, inner, enableBackBtn = false }) => {
  const history = useHistory();

  return (
    <Bar>
      <Wrapper>
        {enableBackBtn && (
          <BackButton onClick={() => history.goBack()}>
            <ChevronDownSvg width={19} height={11} />
          </BackButton>
        )}
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

const BackButton = styled.div`
  margin-right: 23px;
  transform: rotate(90deg);
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

export default PageBar;
