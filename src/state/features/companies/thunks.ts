import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse, AxiosError } from 'axios'
import { companiesApi } from './api';
import { ICompany, MetaData, FetchError, IFilters } from 'src/interfaces';
import normalize from 'src/utils/normalize';

export const getFavouriteCompanies = createAsyncThunk<
  { items: ICompany[], meta: MetaData },
  { page: number, limit: number },
  { rejectValue: FetchError }
>('companies/async/getFavourites', async (data, { rejectWithValue }) => {
    try {
      const { page, limit } = data;
      const response: AxiosResponse = await companiesApi.getFavouriteCompanies(page, limit);
      return response.data;
    } catch (error) {
      return rejectWithValue(normalize.error(error as AxiosError));
    }
  }
);

export const getCompanies = createAsyncThunk<
  { items: ICompany[], meta: MetaData },
  { page: number, limit: number, filters?: IFilters },
  { rejectValue: FetchError }
>('companies/async/getCompanies', async (data, { rejectWithValue }) => {
    try {
      const { page, limit, filters } = data;
      const response: AxiosResponse = await companiesApi.getCompanies(page, limit, filters);
      return response.data;
    } catch (error) {
      return rejectWithValue(normalize.error(error as AxiosError));
    }
  }
);

export const likeCompany = createAsyncThunk<void, string, { rejectValue: FetchError }>(
  'companies/likeCompany', async (companyId, { rejectWithValue }) => {
    try {
      await companiesApi.likeCompany(companyId);
    } catch (error) {
      return rejectWithValue(normalize.error(error as AxiosError));
    }
  }
);

export const dislikeCompany = createAsyncThunk<void, string, { rejectValue: FetchError }>(
  'companies/dislikeCompany', async (companyId: string, { rejectWithValue }) => {
    try {
      await companiesApi.dislikeCompany(companyId);
    } catch (error) {
      return rejectWithValue(normalize.error(error as AxiosError));
    }
  }
);

export const exportToExcel = createAsyncThunk<
  { file: string, name: string },
  { page: number, limit: number, filters?: IFilters },
  { rejectValue: FetchError }
>('companies/exportToExcel', async (data, { rejectWithValue }) => {
    try {
      const { page, limit, filters } = data;
      const response: AxiosResponse = await companiesApi.exportToExcel(page, limit, filters);
      return response.data;
    } catch (error) {
      return rejectWithValue(normalize.error(error as AxiosError));
    }
  }
);
