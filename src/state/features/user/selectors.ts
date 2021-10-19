import { RootState } from 'src/state/types';

export const getUserData = (state: RootState) => state.user.user;

export const isAuthenticated = (state: RootState) => state.user.isAuthenticated;

export const isLoading = (state: RootState) => state.user.loading;

export const getError = (state: RootState) => state.user.error;