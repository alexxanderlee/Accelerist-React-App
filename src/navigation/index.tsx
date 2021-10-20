import React from 'react';
import { useAppSelector } from 'src/state/hooks';
import { userSelectors } from 'src/state/features/user';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const RootNavigator: React.FC = () => {
  const isAuthenticated = useAppSelector(userSelectors.isAuthenticated);

  return (
    isAuthenticated ? <AppNavigator /> : <AuthNavigator />
  );
};

export default RootNavigator;
