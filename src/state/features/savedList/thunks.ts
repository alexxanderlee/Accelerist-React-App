import { createAsyncThunk } from '@reduxjs/toolkit';
import { savedListApi } from './api';
import { AxiosResponse, AxiosError } from 'axios';
import { SortType, IProspect, MetaData, FetchError } from 'src/interfaces';
import normalize from 'src/utils/normalize';

export const getSavedLists = createAsyncThunk<
  { items: IProspect[], meta: MetaData },
  { page: number, limit: number, sort?: SortType },
  { rejectValue: FetchError }
>('savedList/getSavedList', async (data, thunkAPI) => {
    try {
      const { page, limit, sort } = data;
      const response: AxiosResponse = await savedListApi.getAllSavedLists(page, limit, sort);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(normalize.error(error as AxiosError));
    }
  }
);
