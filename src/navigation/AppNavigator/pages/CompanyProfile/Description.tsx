import React from 'react';
import styled from 'styled-components';

const MAX_SYMBOLS_COUNT: number = 230;

interface DescriptionProps {
  description: string;
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
  const shortDescr = description.slice(0, MAX_SYMBOLS_COUNT).concat('...');
  const [showMore, setShowMore] = React.useState<boolean>(false);

  return (
    showMore ? (
      <Wrapper>
        <Text>{description}</Text>
        <Button onClick={() => setShowMore(false)}>see less</Button>
      </Wrapper>
    ) : (
      <Wrapper>
        <Text>{shortDescr}</Text>
        <Button onClick={() => setShowMore(true)}>see more</Button>
      </Wrapper>
    )
  );
};

const Wrapper = styled.div`
  margin-bottom: 24px;
`;

const Text = styled.p`
  margin-top: 0;
  margin-bottom: 4px;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 155%;
  color: #122434;
`;

const Button = styled.div`
  display: inline-block;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #2BAEE0;
  cursor: pointer;

  &:hover {
    color: #50d6ff;
    text-decoration: underline;
  }
`;

export default Description;
