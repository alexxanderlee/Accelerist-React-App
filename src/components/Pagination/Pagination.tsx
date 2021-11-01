import React from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

interface PaginationProps {
  totalItems: number,
  itemCount: number,
  itemsPerPage: number,
  currentPage: number
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, currentPage, itemsPerPage, itemCount }) => {
  const history = useHistory();

  const firstItemOnPage = (currentPage - 1) * itemsPerPage + 1;
  const lastItemOnPage = firstItemOnPage + itemCount - 1;
  const isFirshPage = currentPage === 1;
  const isLastPage = Math.ceil(totalItems / itemsPerPage) === currentPage;

  function setPage(page: number) {
    const { pathname, search } = history.location;
    const params = { ...queryString.parse(search), page };
    history.push(`${pathname}?${queryString.stringify(params)}`);
  }

  const handlePrevPage = () => setPage(currentPage - 1);

  const handleNextPage = () => setPage(currentPage + 1);

  return (
    <Wrapper>
      {!isFirshPage && (
        <ArrowButton onClick={handlePrevPage}>
          <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.90914 0.376577C10.4112 0.87868 10.4112 1.69275 9.90914 2.19485L3.10399 9L9.90914 15.8051C10.4112 16.3073 10.4112 17.1213 9.90914 17.6234C9.40703 18.1255 8.59297 18.1255 8.09086 17.6234L0.376577 9.90914C-0.125526 9.40703 -0.125526 8.59297 0.376577 8.09086L8.09086 0.376577C8.59297 -0.125526 9.40703 -0.125526 9.90914 0.376577Z" fill="black"/>
          </svg>
        </ArrowButton>
      )}
      <PaginationValue>{firstItemOnPage}-{lastItemOnPage} of {totalItems}</PaginationValue>
      {!isLastPage && (
        <ArrowButton onClick={handleNextPage}>
          <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.376577 0.376577C0.87868 -0.125526 1.69275 -0.125526 2.19485 0.376577L9.90914 8.09086C10.4112 8.59297 10.4112 9.40703 9.90914 9.90914L2.19485 17.6234C1.69275 18.1255 0.87868 18.1255 0.376577 17.6234C-0.125526 17.1213 -0.125526 16.3073 0.376577 15.8051L7.18173 9L0.376577 2.19485C-0.125526 1.69275 -0.125526 0.87868 0.376577 0.376577Z" fill="black"/>
          </svg>
        </ArrowButton>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ArrowButton = styled.button`
  margin-right: 19px;
  padding: 0;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.6;
  }

  &:last-child {
    margin-right: 0;
    margin-left: 19px;
  }
`;

const PaginationValue = styled.p`
  margin: 0;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #122434;
`;

export default Pagination;
