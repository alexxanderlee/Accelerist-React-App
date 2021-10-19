import { createAsyncThunk } from '@reduxjs/toolkit';
import { savedListApi } from './api';
import { AxiosResponse, AxiosError } from 'axios';
import { SortType, IProspect, MetaData, FetchError, IFilters } from 'src/interfaces';
import normalize from 'src/utils/normalize';

export const getSavedLists = createAsyncThunk<
  { items: IProspect[], meta: MetaData },
  { page: number, limit: number, sort?: SortType },
  { rejectValue: FetchError }
>('savedList/getSavedList', async (data, { rejectWithValue }) => {
  try {
    const { page, limit, sort } = data;
    const response: AxiosResponse = await savedListApi.getAllSavedLists(page, limit, sort);
    return response.data;
  } catch (error) {
    return rejectWithValue(normalize.error(error as AxiosError));
  }
});

export const createSavedList = createAsyncThunk<
  IProspect,
  { filters: IFilters, prospectsAvailable: number },
  { rejectValue: FetchError }
>('savedList/createSavedList', async (data, { rejectWithValue }) => {
  try {
    const { filters, prospectsAvailable } = data;
    const response: AxiosResponse = await savedListApi.createSavedList(filters, prospectsAvailable);
    return response.data;
  } catch (error) {
    return rejectWithValue(normalize.error(error as AxiosError));
  }
});
