import styled from 'styled-components';
import { authBgJpg } from 'src/assets/images';
import { Link } from 'react-router-dom'

export const Background = styled.section`
  background-image: url(${authBgJpg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
`;

export const Header = styled.header`
  width: 100%;
  height: 80px;
  background-color: #122434;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LogoImg = styled.img`
  max-width: 200px;
`;

export const Content = styled.div`
  min-height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const ContentWrapper = styled.div`
  width: 454px;
  margin-top: 73px;
  padding: 40px;
  background-color: #FFFFFF;
  border-radius: 6px;
`;

export const StyledLink = styled(Link)`
  margin-bottom: 28px;
`;
