import { RootState } from 'src/state/types';

export const getUserData = (state: RootState) => state.user.data;

export const getToken = (state: RootState) => state.user.data?.token;

export const isLoading = (state: RootState) => state.user.loading;

export const getError = (state: RootState) => state.user.error;