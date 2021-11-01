import React from 'react';
import { useAppSelector } from 'src/state/hooks';
import { userSelectors } from 'src/state/features/user';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const RootNavigator: React.FC = () => {
  const isAuthenticated = useAppSelector(userSelectors.isAuthenticated);

  return (
    isAuthenticated ? <MainNavigator /> : <AuthNavigator />
  );
};

export default RootNavigator;
