import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse, AxiosError } from 'axios'
import { companiesApi } from './api';
import { ICompany, MetaData, IFilters } from 'src/interfaces';

export const getFavouriteCompanies = createAsyncThunk<
  { items: ICompany[], meta: MetaData },
  { page: number, limit: number },
  { rejectValue: string }
>('companies/async/getFavourites', async (data, { rejectWithValue }) => {
    try {
      const { page, limit } = data;
      const response: AxiosResponse = await companiesApi.getFavouriteCompanies(page, limit);
      return response.data;
    } catch (error) {
      const { response, message } = error as AxiosError;
      const errorMsg = response ? response.data.message : message;
      return rejectWithValue(errorMsg);
    }
  }
);

export const getCompanies = createAsyncThunk<
  { items: ICompany[], meta: MetaData },
  { page: number, limit: number, filters?: IFilters },
  { rejectValue: string }
>('companies/async/getCompanies', async (data, { rejectWithValue }) => {
    try {
      const { page, limit, filters } = data;
      const response: AxiosResponse = await companiesApi.getCompanies(page, limit, filters);
      return response.data;
    } catch (error) {
      const { response, message } = error as AxiosError;
      const errorMsg = response ? response.data.message : message;
      return rejectWithValue(errorMsg);
    }
  }
);

export const likeCompany = createAsyncThunk<void, string, { rejectValue: string }>(
  'companies/likeCompany', async (companyId, { rejectWithValue }) => {
    try {
      await companiesApi.likeCompany(companyId);
    } catch (error) {
      const { response, message } = error as AxiosError;
      const errorMsg = response ? response.data.message : message;
      return rejectWithValue(errorMsg);
    }
  }
);

export const dislikeCompany = createAsyncThunk<void, string, { rejectValue: string }>(
  'companies/dislikeCompany', async (companyId: string, { rejectWithValue }) => {
    try {
      await companiesApi.dislikeCompany(companyId);
    } catch (error) {
      const { response, message } = error as AxiosError;
      const errorMsg = response ? response.data.message : message;
      return rejectWithValue(errorMsg);
    }
  }
);

export const exportToExcel = createAsyncThunk<
  { file: string, name: string },
  { page: number, limit: number, filters?: IFilters },
  { rejectValue: string }
>('companies/exportToExcel', async (data, { rejectWithValue }) => {
    try {
      const { page, limit, filters } = data;
      const response: AxiosResponse = await companiesApi.exportToExcel(page, limit, filters);
      return response.data;
    } catch (error) {
      const { response, message } = error as AxiosError;
      const errorMsg = response ? response.data.message : message;
      return rejectWithValue(errorMsg);
    }
  }
);
