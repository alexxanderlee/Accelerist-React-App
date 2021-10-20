import React from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import { authBgJpg } from 'src/assets/images';
import { Button } from 'src/components/ui';
import { logoLightSvg } from 'src/assets/images';

const AuthWrapper: React.FC = ({ children }) => {
  return (
    <Background>
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
              variant="TransparentButton"
              text="Return to Login"
            />
          </StyledLink>
        )} />
      </Content>
    </Background>
  );
};

const Background = styled.section`
  background-image: url(${authBgJpg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
`;

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
  min-height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ContentWrapper = styled.div`
  width: 454px;
  margin-top: 73px;
  padding: 40px;
  background-color: #FFFFFF;
  border-radius: 6px;
`;

const StyledLink = styled(Link)`
  margin-bottom: 28px;
`;

export default AuthWrapper;
