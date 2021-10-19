import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse, AxiosError } from 'axios';
import { userApi } from './api';
import { FetchError, IUser } from 'src/interfaces';
import normalize from 'src/utils/normalize';

export interface AuthRequestAttributes {
  email: string;
  password: string;
}

export interface ChangePasswordAttributes {
  password: string;
  resetToken: string | string[] | null;
}

export const loginUser = createAsyncThunk<
  { user: IUser, token: string },
  AuthRequestAttributes,
  { rejectValue: FetchError }
>('user/login', async ({ email, password }, thunkAPI) => {
  try {
    const response: AxiosResponse = await userApi.login(email, password);
    return normalize.authData(response);
  } catch (error) {
    return thunkAPI.rejectWithValue(normalize.error(error as AxiosError));
  }
});

export const signupUser = createAsyncThunk<
  { user: IUser, token: string },
  AuthRequestAttributes,
  { rejectValue: FetchError }
>('user/signup', async ({ email, password }, thunkAPI) => {
  try {
    const response: AxiosResponse = await userApi.signup(email, password);
    return normalize.authData(response);
  } catch (error) {
    return thunkAPI.rejectWithValue(normalize.error(error as AxiosError));
  }
});

export const sendMail = createAsyncThunk<null, string, { rejectValue: FetchError }>(
  'user/changePassword/sendMail',
  async (email, thunkAPI) => {
    try {
      await userApi.sendMail(email);
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(normalize.error(error as AxiosError));
    }
  }
);

export const changePassword = createAsyncThunk<
  null,
  ChangePasswordAttributes,
  { rejectValue: FetchError }
>('user/changePassword/sendMail',
  async ({ password, resetToken }, thunkAPI) => {
    try {
      await userApi.changePassword(password, resetToken);
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(normalize.error(error as AxiosError));
    }
  }
);
