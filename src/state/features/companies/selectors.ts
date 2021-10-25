import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/state/types';
import { ICompany } from 'src/interfaces';

export const getCompanies = (state: RootState) => state.companies.companies.items;

export const getCompaniesMeta = (state: RootState) => state.companies.companies.meta;

export const getFavourites = (state: RootState) => state.companies.favourites.items;

export const getFavouritesMeta = (state: RootState) => state.companies.favourites.meta;

export const isLoading = (state: RootState) => state.companies.loading;

export const getCompanyById = createSelector(
  (state: RootState, companyId: string) => ({
    companies: getCompanies(state),
    id: companyId,
  }),
  ({ companies, id }) => companies.find((company: ICompany) => company.id === id)
);
