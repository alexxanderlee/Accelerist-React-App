import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Dashboard, SearchPage } from './pages';
import { AppWrapper } from 'src/layouts';
import { PageBar } from 'src/components';

const AppNavigator: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route path="/search" component={SearchPage} />
      <Route path="/prospects" render={(props) => (
        <AppWrapper
          {...props}
          pageBar={<PageBar pageTitle="Prospecting Sessions" />}
        />
      )} />
      <Route path="/favourites" render={(props) => (
        <AppWrapper
          {...props}
          pageBar={<PageBar pageTitle="Favourites" />}
        />
      )} />
      <Redirect to="/dashboard" />
    </Switch>
  );
};

export default AppNavigator;
