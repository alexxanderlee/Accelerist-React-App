import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse, AxiosError } from 'axios';
import { teamApi } from './api';
import { ITeam, ILastLogin, FetchError } from 'src/interfaces';
import normalize from 'src/utils/normalize';

export const getTeam = createAsyncThunk<ITeam, void, { rejectValue: FetchError }>(
  'team/getTeam', async (_, thunkAPI) => {
    try {
      const response: AxiosResponse = await teamApi.getTeam();
      return response.data as ITeam;
    } catch (error) {
      return thunkAPI.rejectWithValue(normalize.error(error as AxiosError));
    }
  }
);

export const getLastLogins = createAsyncThunk<ILastLogin[], void, { rejectValue: FetchError }>(
  'team/getLastLogins', async (_, thunkAPI) => {
    try {
      const response: AxiosResponse = await teamApi.getLastLogins();
      return response.data as ILastLogin[];
    } catch (error) {
      return thunkAPI.rejectWithValue(normalize.error(error as AxiosError));
    }
  }
);

