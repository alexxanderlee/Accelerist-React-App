import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Dashboard, SearchPage, Prospects, Prospect } from './pages';
import { AppWrapper } from 'src/layouts';
import { PageBar } from 'src/components';

const AppNavigator: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route path="/search" component={SearchPage} />
      <Route exact path="/prospects" component={Prospects} />
      <Route path="/prospects/:prospectId" component={Prospect} />
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
