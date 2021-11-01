import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  Dashboard,
  SearchPage,
  Prospects,
  Prospect,
  Favourites,
  CompanyProfile,
} from './pages';

const AppNavigator: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/search" component={SearchPage} />
      <Route exact path="/prospects" component={Prospects} />
      <Route path="/prospects/:prospectId" component={Prospect} />
      <Route exact path="/favourites" component={Favourites} />
      <Route path="/company/:companyId" component={CompanyProfile} />
      <Redirect to="/dashboard" />
    </Switch>
  );
};

export default AppNavigator;
