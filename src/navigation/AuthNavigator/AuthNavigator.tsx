import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthLayout } from 'src/layouts';
import { Login, Register, SendMail, ChangePassword, ResendLink } from './pages';

const AuthNavigator: React.FC= () => {
  return (
    <AuthLayout>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Register} />
        <Route exact path="/reset" component={SendMail} />
        <Route path="/change_password" component={ChangePassword} />
        <Route path="/resend_link" component={ResendLink} />
        <Redirect to="/login" />
      </Switch>
    </AuthLayout>
  );
};

export default AuthNavigator;
