import { createAsyncThunk } from '@reduxjs/toolkit';
import { savedListApi } from './api';
import { AxiosResponse, AxiosError } from 'axios';
import { SortType, IProspect, MetaData, IFilters } from 'src/interfaces';

export const getSavedLists = createAsyncThunk<
  { items: IProspect[], meta: MetaData },
  { page: number, limit: number, sort?: SortType },
  { rejectValue: string }
>('savedList/getSavedList', async (data, { rejectWithValue }) => {
  try {
    const { page, limit, sort } = data;
    const response: AxiosResponse = await savedListApi.getAllSavedLists(page, limit, sort);
    return response.data;
  } catch (error) {
    const { response, message } = error as AxiosError;
    const errorMsg = response ? response.data.message : message;
    return rejectWithValue(errorMsg);
  }
});

export const createSavedList = createAsyncThunk<
  IProspect,
  { filters: IFilters, prospectsAvailable: number },
  { rejectValue: string }
>('savedList/createSavedList', async (data, { rejectWithValue }) => {
  try {
    const { filters, prospectsAvailable } = data;
    const response: AxiosResponse = await savedListApi.createSavedList(filters, prospectsAvailable);
    return response.data;
  } catch (error) {
    const { response, message } = error as AxiosError;
    const errorMsg = response ? response.data.message : message;
    return rejectWithValue(errorMsg);
  }
});
