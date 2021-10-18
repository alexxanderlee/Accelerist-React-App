import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthPage } from 'src/pages';
import { useAppSelector, useAppDispatch } from 'src/state/hooks';
import { userSelectors, userActions } from 'src/state/features/user';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(userSelectors.getToken);

  return (
    <>
      {token ? (
        <Switch>
          <Route exact path="/dashboard" render={() => (
            <>
              <div>You are logged in!</div>
              <button onClick={() => dispatch(userActions.logout())}>Log out</button>
            </>
          )} />
          <Redirect to="/dashboard" />
        </Switch>
      ) : (
        <AuthPage />
      )}
    </>
  );
};

export default App;
