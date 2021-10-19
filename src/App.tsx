import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthPage } from 'src/pages';
import { Dashboard, SearchPage } from 'src/pages';
import { useAppSelector } from 'src/state/hooks';
import { userSelectors } from 'src/state/features/user';
import { ContentWrapper } from 'src/layouts';

const App: React.FC = () => {
  const isAuthenticated = useAppSelector(userSelectors.isAuthenticated);

  return (
    <>
      {isAuthenticated ? (
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/search" component={SearchPage} />
          <Route path="/prospects" render={(props) => <ContentWrapper {...props} pageTitle="Prospecting Sessions" />} />
          <Route path="/favourites" render={(props) => <ContentWrapper {...props} pageTitle="Favourites" />} />
          <Redirect to="/dashboard" />
        </Switch>
      ) : (
        <AuthPage />
      )}
    </>
  );
};

export default App;
