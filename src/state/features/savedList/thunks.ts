import { createAsyncThunk } from '@reduxjs/toolkit';
import { savedListApi } from './api';
import { AxiosResponse, AxiosError } from 'axios';
import { IProspect, MetaData, IFilters } from 'src/interfaces';
import { SortTypes } from 'src/constants';

export const getSavedLists = createAsyncThunk<
  { items: IProspect[], meta: MetaData },
  { page: number, limit: number, sort?: SortTypes },
  { rejectValue: string }
>('savedList/getSavedLists', async (data, { rejectWithValue }) => {
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

export const getSavedListById = createAsyncThunk<IProspect, string, { rejectValue: string }>(
  'savedList/getSavedListById', async (id, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await savedListApi.getSavedListById(id);
      return response.data;
    } catch (error) {
      const { response, message } = error as AxiosError;
      const errorMsg = response ? response.data.message : message;
      return rejectWithValue(errorMsg);
    }
  }
);

export const updateSavedList = createAsyncThunk<
  IProspect,
  { id: string, filters: IFilters, prospectsAvailable: number, name: string },
  { rejectValue: string }
>('savedList/updateSavedList', async (data, { rejectWithValue }) => {
  try {
    const { id, filters, prospectsAvailable, name } = data;
    const response: AxiosResponse = await savedListApi.updateSavedList(id, filters, prospectsAvailable, name);
    return response.data;
  } catch(error) {
    const { response, message } = error as AxiosError;
    const errorMsg = response ? response.data.message : message;
    return rejectWithValue(errorMsg);
  }
});

export const deleteSavedList = createAsyncThunk<string, string, { rejectValue: string }>(
  'savedList/deleteSavedList', async (id, { rejectWithValue }) => {
    try {
      await savedListApi.deleteSavedListById(id);
      return id;
    } catch (error) {
      const { response, message } = error as AxiosError;
      const errorMsg = response ? response.data.message : message;
      return rejectWithValue(errorMsg);
    }
  }
);

export const exportToExcel = createAsyncThunk<
  { file: string, name: string },
  string,
  { rejectValue: string }
>('companies/exportToExcel', async (savedListId, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await savedListApi.exportToExcel(savedListId);
      return response.data;
    } catch (error) {
      const { response, message } = error as AxiosError;
      const errorMsg = response ? response.data.message : message;
      return rejectWithValue(errorMsg);
    }
  }
);
