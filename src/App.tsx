import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthPage } from 'src/pages';

const authenticated = false; 

const App: React.FC = () => {
  return (
    <>
      {authenticated ? (
        <Switch>
          <Route exact path="/dashboard" />
        </Switch>
      ) : (
        <AuthPage />
      )}
    </>
  );
};

export default App;
