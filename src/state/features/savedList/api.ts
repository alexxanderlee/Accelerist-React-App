import axios from 'axios';
import { IFilters, SortType } from 'src/interfaces';

const axiosInstance = axios.create({
  baseURL: 'https://accelerist.herokuapp.com',
  headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
});

export const savedListApi = {
  getAllSavedLists: (page: number, limit: number, sort?: SortType) => axiosInstance
    .get(`/api/v1/saved-list?page=${page}&limit=${limit}&sort=${sort}`),

  createSavedList: (filters: IFilters, prospectsAvailable: number) => axiosInstance
    .post('/api/v1/saved-list', {
      filters,
      prospectsAvailable,
    }),

  updateSavedList: (id: string, filters: IFilters, prospectsAvailable: number, name: string) => axiosInstance
    .patch(`/api/v1/saved-list/${id}`, {
      filters,
      prospectsAvailable,
      name,
    }),

  getSavedListById: (id: string) => axiosInstance.get(`/api/v1/saved-list/${id}`),

  deleteSavedListById: (id: string) => axiosInstance.delete(`/api/v1/saved-list/${id}`),

  exportToExcel: (id: string) => axiosInstance.get(`/api/v1/saved-list/${id}/excel`),
};
