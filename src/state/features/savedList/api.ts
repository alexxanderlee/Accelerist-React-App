import axios from 'axios';
import { IFilters, SortType } from 'src/interfaces';

const baseURL = 'https://accelerist.herokuapp.com';
const getAccessToken = () => localStorage.getItem('token');

export const savedListApi = {
  getAllSavedLists: (page: number, limit: number, sort?: SortType) => axios({
    method: 'GET',
    url: `${baseURL}/api/v1/saved-list?page=${page}&limit=${limit}&sort=${sort}`,
    headers: { 'Authorization': `Bearer ${getAccessToken()}` },
  }),

  createSavedList: (filters: IFilters, prospectsAvailable: number) => axios({
    method: 'POST',
    url: `${baseURL}/api/v1/saved-list`,
    headers: { 'Authorization': `Bearer ${getAccessToken()}` },
    data: { filters, prospectsAvailable },
  }),

  updateSavedList: (id: string, filters: IFilters, prospectsAvailable: number, name: string) => axios({
    method: 'PATCH',
    url: `${baseURL}/api/v1/saved-list/${id}`,
    headers: { 'Authorization': `Bearer ${getAccessToken()}` },
    data: { filters, prospectsAvailable, name },
  }),

  getSavedListById: (id: string) => axios({
    method: 'GET',
    url: `${baseURL}/api/v1/saved-list/${id}`,
    headers: { 'Authorization': `Bearer ${getAccessToken()}` },
  }),

  deleteSavedListById: (id: string) => axios({
    method: 'DELETE',
    url: `${baseURL}/api/v1/saved-list/${id}`,
    headers: { 'Authorization': `Bearer ${getAccessToken()}` },
  }),

  exportToExcel: (id: string) => axios({
    method: 'GET',
    url: `${baseURL}/api/v1/saved-list/${id}/excel`,
    headers: { 'Authorization': `Bearer ${getAccessToken()}` },
  }),
};
