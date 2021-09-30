import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const Title = styled.h1`
  margin: 0;
  margin-bottom: 24px;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 24px;
  line-height: 148%;
  color: #122434;
  text-align: center;
`;

export const Tabs = styled.div`
  margin-bottom: 24px;
  padding: 2px 3px;
  background-color: #F8F8F8;
  border-radius: 6px;
  display: flex;
`;

export const TabLink = styled(Link)<{ 'data-active'?: boolean }>`
  flex: 1;
  padding: 9px;
  text-align: center;
  text-decoration: none;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #737373;

  ${props => props['data-active'] && css`
    background-color: #CAF0FF;
    border-radius: 6px;
    color: #122434;
  `}
`;

export const Row = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;

export const StyledLink = styled(Link)`
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #737373;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #122434;
  }
`;
