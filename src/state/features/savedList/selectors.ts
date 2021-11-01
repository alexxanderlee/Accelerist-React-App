import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/state/types';
import { IProspect } from 'src/interfaces';

export const getSavedLists = (state: RootState) => state.savedList.items;

export const getMeta = (state: RootState) => state.savedList.meta;

export const isLoading = (state: RootState) => state.savedList.loading;

export const getSavedListById = createSelector(
  (state: RootState, savedListId: string) => ({
    savedLists: getSavedLists(state),
    id: savedListId,
  }),
  ({ savedLists, id }) => savedLists.find((savedList: IProspect) => savedList.id === id)
);
