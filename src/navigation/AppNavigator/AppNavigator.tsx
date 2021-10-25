import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Dashboard, SearchPage, Prospects, Prospect, Favourites } from './pages';

const AppNavigator: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route path="/search" component={SearchPage} />
      <Route exact path="/prospects" component={Prospects} />
      <Route path="/prospects/:prospectId" component={Prospect} />
      <Route path="/favourites" component={Favourites} />
      <Redirect to="/dashboard" />
    </Switch>
  );
};

export default AppNavigator;
