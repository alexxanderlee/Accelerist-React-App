import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Background, Header, Content, ContentWrapper, LogoImg, StyledLink } from './styled';
import { LoginForm, RegisterForm, ResetPassword } from 'src/components/forms';
import { Button } from 'src/components/ui';
import { logoLightSvg } from 'src/assets/images';

interface AuthPageProps {
}

const AuthPage: React.FC<AuthPageProps> = (props) => {
  return (
    <Background>
      <Header>
        <LogoImg src={logoLightSvg} alt="Logotype" />
      </Header>
      <Content>
        <ContentWrapper>
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/signup" component={RegisterForm} />
            <Route exact path="/reset" component={ResetPassword} />
            <Redirect to="/login" />
          </Switch>
        </ContentWrapper>
        <Route exact path="/reset" render={() => (
          <StyledLink to="/login">
            <Button type="button" variant="TransparentButton" text="Return to Login" />
          </StyledLink>
        )} />
      </Content>
    </Background>
  );
};

export default AuthPage;
