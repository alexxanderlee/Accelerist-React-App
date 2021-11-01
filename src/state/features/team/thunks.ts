import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse, AxiosError } from 'axios';
import { teamApi } from './api';
import { ITeam, ILastLogin } from 'src/interfaces';

export const getTeam = createAsyncThunk<ITeam, void, { rejectValue: string }>(
  'team/getTeam', async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await teamApi.getTeam();
      return response.data as ITeam;
    } catch (error) {
      const { response, message } = error as AxiosError;
      const errorMsg = response ? response.data.message : message;
      return rejectWithValue(errorMsg);
    }
  }
);

export const getLastLogins = createAsyncThunk<ILastLogin[], void, { rejectValue: string }>(
  'team/getLastLogins', async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await teamApi.getLastLogins();
      return response.data as ILastLogin[];
    } catch (error) {
      const { response, message } = error as AxiosError;
      const errorMsg = response ? response.data.message : message;
      return rejectWithValue(errorMsg);
    }
  }
);

export const getReports = createAsyncThunk<
  { team: ITeam, lastLogins: ILastLogin[] },
  void,
  { rejectValue: string }
>('team/getReports', async (_, { rejectWithValue }) => {
  try {
    const [teamResponse, lastLoginsResponse]: AxiosResponse[] = await Promise.all([
      teamApi.getTeam(),
      teamApi.getLastLogins(),
    ]);
    return {
      team: teamResponse.data,
      lastLogins: lastLoginsResponse.data,
    };
  } catch (error) {
    const { response, message } = error as AxiosError;
    const errorMsg = response ? response.data.message : message;
    return rejectWithValue(errorMsg);
  }
});
