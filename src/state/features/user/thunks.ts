import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse, AxiosError } from 'axios';
import { userApi } from 'src/utils/api';
import { FetchError, UserData } from 'src/interfaces';

export interface AuthRequestAttributes {
  email: string;
  password: string;
}

export interface ChangePasswordAttributes {
  password: string;
  resetToken: string | string[] | null;
}

export const loginUser = createAsyncThunk<
  UserData,
  AuthRequestAttributes,
  { rejectValue: FetchError }
>('user/login', async ({ email, password }, thunkAPI) => {
  try {
    const response: AxiosResponse = await userApi.login(email, password);
    return normalizeUserData(response);
  } catch (error) {
    return thunkAPI.rejectWithValue(handleError(error as AxiosError));
  }
});

export const signupUser = createAsyncThunk<
  UserData,
  AuthRequestAttributes,
  { rejectValue: FetchError }
>('user/signup', async ({ email, password }, thunkAPI) => {
  try {
    const response: AxiosResponse = await userApi.signup(email, password);
    return normalizeUserData(response);
  } catch (error) {
    return thunkAPI.rejectWithValue(handleError(error as AxiosError));
  }
});

export const sendMail = createAsyncThunk<null, string, { rejectValue: FetchError }>(
  'user/changePassword/sendMail',
  async (email, thunkAPI) => {
    try {
      await userApi.sendMail(email);
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleError(error as AxiosError));
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
      return thunkAPI.rejectWithValue(handleError(error as AxiosError));
    }
  }
);

const normalizeUserData = (res: AxiosResponse): UserData => ({
  id: res.data.user.id,
  email: res.data.user.email,
  token: res.data.accessToken,
});

const handleError = (error: AxiosError): FetchError => error.response
  ? error.response.data
  : { error: error.name, message: error.message };
