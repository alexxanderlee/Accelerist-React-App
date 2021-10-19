import { RootState } from 'src/state/types';

export const getCompanies = (state: RootState) => state.companies.companies.items;

export const getCompaniesMeta = (state: RootState) => state.companies.companies.meta;

export const getFavourites = (state: RootState) => state.companies.favourites.items;

export const isLoading = (state: RootState) => state.companies.loading;

export const getError = (state: RootState) => state.companies.error;
