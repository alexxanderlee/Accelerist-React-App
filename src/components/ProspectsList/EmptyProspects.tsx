import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from 'src/components/ui';
import { folderPlusLgSvg } from 'src/assets/icons';

const EmptyProspects: React.FC = () => {
  return (
    <Root>
      <Image src={folderPlusLgSvg} />
      <Title>No lists saved</Title>
      <Text>Go to search page and add to saved list</Text>
      <BtnWrapper to="/search">
        <Button
          text="Search"
          type="button"
          variant="OutlinedPrimary"
          customStyle={'width: 244px'}
        />
      </BtnWrapper>
    </Root>
  );
};

const Root = styled.div`
  flex: 1;
  padding: 40px 0;
  background-color: #FFFFFF;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img``;

const Title = styled.p`
  margin-top: 40px;
  margin-bottom: 0;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 145%;
  color: #122434;
`;

const Text = styled.p`
  margin-top: 8px;
  margin-bottom: 0;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #BFBFBF;
`;

const BtnWrapper = styled(Link)`
  margin-top: 32px;
`;

export default EmptyProspects;
