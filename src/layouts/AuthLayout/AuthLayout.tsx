import React from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import { authBgJpg } from 'src/assets/images';
import { Button } from 'src/components/ui';
import { logoLightSvg } from 'src/assets/images';
import device from 'src/constants/devices';

const AuthLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header>
        <LogoImg src={logoLightSvg} alt="Logotype" />
      </Header>
      <Content>
        <ContentWrapper>
          {children}
        </ContentWrapper>
        <Route exact path={['/reset', '/change_password', '/resend_link']} render={() => (
          <StyledLink to="/login">
            <Button
              type="button"
              variant="Transparent"
              text="Return to Login"
            />
          </StyledLink>
        )} />
      </Content>
    </>
  );
};

const Header = styled.header`
  width: 100%;
  height: 80px;
  background-color: #122434;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoImg = styled.img`
  max-width: 200px;
`;

const Content = styled.div`
  padding: 73px 0;
  min-height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-image: url(${authBgJpg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;

  @media ${device.mobileM} {
    padding: 20px 16px;
  }
`;

const ContentWrapper = styled.div`
  width: 454px;
  padding: 40px;
  background-color: #FFFFFF;
  border-radius: 6px;

  @media ${device.mobileM} {
    width: 100%;
    padding: 24px 16px 16px 16px;
  }
`;

const StyledLink = styled(Link)`
  margin-bottom: 28px;
`;

export default AuthLayout;
