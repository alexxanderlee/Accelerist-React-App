import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthPage } from 'src/pages';
import { Dashboard } from 'src/pages';
import { useAppSelector } from 'src/state/hooks';
import { userSelectors } from 'src/state/features/user';

const App: React.FC = () => {
  const isAuthenticated = useAppSelector(userSelectors.isAuthenticated);

  return (
    <>
      {isAuthenticated ? (
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Redirect to="/dashboard" />
        </Switch>
      ) : (
        <AuthPage />
      )}
    </>
  );
};

export default App;
