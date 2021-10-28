import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from 'src/components/ui';
import { heartLgSvg } from 'src/assets/icons';

const EmptyFavourites: React.FC = () => {
  return (
    <Root>
      <Image src={heartLgSvg} />
      <Title>No favorite company</Title>
      <Text>Go to the search page and add to favorites</Text>
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
  padding: 60px 0;
  background-color: #FFFFFF;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export default EmptyFavourites;
