import React from 'react';
import styled from 'styled-components';
import formatFilters from 'src/utils/formatFilters';
import { IFilters } from 'src/interfaces';

interface FiltersProps {
  filters: IFilters;
  limit?: number;
}

const Filters: React.FC<FiltersProps> = ({ filters, limit }) => {
  const formattedFilters = formatFilters(filters ?? {}, limit);

  return (
    <div>
      <Title>Filters</Title>
      <ListWrapper>
        {formattedFilters.length > 0 ? (
          formattedFilters.map((item, index) => <FilterItem key={index}>{item}</FilterItem>)
        ) : (
          <NoFilters>No Filters</NoFilters>
        )}
      </ListWrapper>
    </div>
  );
};

const Title = styled.p`
  margin: 0;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #737373;
`;

const ListWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
`;

const FilterItem = styled.div`
  margin-right: 8px;
  margin-bottom: 8px;
  padding: 6px 10px;
  background-color: #FFFFFF;
  border: 1px solid #CAF0FF;
  border-radius: 6px;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #122434;

  &:last-child {
    margin-right: 0;
  }
`;

const NoFilters = styled.div`
  margin-bottom: 8px;
  width: 100%;
  padding: 6px 10px;
  border-radius: 6px;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  background-color: #FFFFFF;
  border: 1px solid #e9e9e9;
  color: #122434;
  text-align: center;
`;

export default Filters;
