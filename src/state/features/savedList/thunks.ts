import { createAsyncThunk } from '@reduxjs/toolkit';
import { savedListApi } from './api';
import { AxiosResponse, AxiosError } from 'axios';
import { SortType, IProspect, SavedListMeta, FetchError } from 'src/interfaces';
import normalize from 'src/utils/normalize';

export const getSavedLists = createAsyncThunk<
  { items: IProspect[], meta: SavedListMeta },
  { page: number, limit: number, sort?: SortType },
  { rejectValue: FetchError }
>('savedList/getSavedList', async (payload, thunkAPI) => {
    try {
      const { page, limit, sort } = payload;
      const response: AxiosResponse = await savedListApi.getAllSavedLists(page, limit, sort);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(normalize.error(error as AxiosError));
    }
  }
);
