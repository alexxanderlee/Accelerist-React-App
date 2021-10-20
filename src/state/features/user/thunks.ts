import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse, AxiosError } from 'axios';
import { userApi } from './api';
import { IUser } from 'src/interfaces';

export interface AuthRequestAttributes {
  email: string;
  password: string;
}

export interface ChangePasswordAttributes {
  password: string;
  resetToken: string | string[] | null;
}

export const loginUser = createAsyncThunk<
  { user: IUser, accessToken: string },
  AuthRequestAttributes,
  { rejectValue: string }
>('user/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response: AxiosResponse = await userApi.login(email, password);
    return response.data;
  } catch (error) {
    const { response, message } = error as AxiosError;
    const errorMsg = response ? response.data.message : message;
    return rejectWithValue(errorMsg);
  }
});

export const signupUser = createAsyncThunk<
  { user: IUser, accessToken: string },
  AuthRequestAttributes,
  { rejectValue: string }
>('user/signup', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response: AxiosResponse = await userApi.signup(email, password);
    return response.data;
  } catch (error) {
    const { response, message } = error as AxiosError;
    const errorMsg = response ? response.data.message : message;
    return rejectWithValue(errorMsg);
  }
});

export const sendMail = createAsyncThunk<void, string, { rejectValue: string }>(
  'user/changePassword/sendMail',
  async (email, { rejectWithValue }) => {
    try {
      await userApi.sendMail(email);
    } catch (error) {
      const { response, message } = error as AxiosError;
      const errorMsg = response ? response.data.message : message;
      return rejectWithValue(errorMsg);
    }
  }
);

export const changePassword = createAsyncThunk<void, ChangePasswordAttributes, { rejectValue: string }>(
  'user/changePassword/sendMail',
  async ({ password, resetToken }, { rejectWithValue }) => {
    try {
      await userApi.changePassword(password, resetToken);
    } catch (error) {
      const { response, message } = error as AxiosError;
      const errorMsg = response ? response.data.message : message;
      return rejectWithValue(errorMsg);
    }
  }
);
