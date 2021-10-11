import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse, AxiosError } from 'axios'
import { companiesApi } from './api';
import { ICompany, MetaData, FetchError } from 'src/interfaces';
import normalize from 'src/utils/normalize';

export const getFavouriteCompanies = createAsyncThunk<
  { items: ICompany[], meta: MetaData },
  { page: number, limit: number },
  { rejectValue: FetchError }
>('companies/getFavourites', async (data, { rejectWithValue }) => {
    try {
      const { page, limit } = data;
      const response: AxiosResponse = await companiesApi.getFavouriteCompanies(page, limit);
      return response.data;
    } catch (error) {
      return rejectWithValue(normalize.error(error as AxiosError));
    }
  }
);
