import { RootState } from 'src/state/types';

export const getSavedLists = (state: RootState) => state.savedList.items;

export const getMeta = (state: RootState) => state.savedList.meta;

export const isLoading = (state: RootState) => state.savedList.loading;

export const getError = (state: RootState) => state.savedList.error;
