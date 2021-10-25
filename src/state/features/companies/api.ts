import axios from 'axios';
import queryString from 'query-string';
import { IFilters } from 'src/interfaces';

const baseURL = 'https://accelerist.herokuapp.com';
const getAccessToken = () => localStorage.getItem('token');

export const companiesApi = {
  getFavouriteCompanies: (page: number, limit: number) => axios({
    method: 'GET',
    url: `${baseURL}/api/v1/companies/favorites?page=${page}&limit=${limit}`,
    headers: { 'Authorization': `Bearer ${getAccessToken()}` },
  }),

  getCompanies: (page: number, limit: number, filters?: IFilters) => axios({
    method: 'GET',
    url: `${baseURL}/api/v1/companies?${queryString.stringify({ page, limit, ...filters }, { arrayFormat: 'bracket' })}`,
    headers: { 'Authorization': `Bearer ${getAccessToken()}` },
  }),

  getCompanyById: (id: string) => axios({
    method: 'GET',
    url: `${baseURL}/api/v1/companies/${id}`,
    headers: { 'Authorization': `Bearer ${getAccessToken()}` },
  }),

  likeCompany: (id: string) => axios({
    method: 'GET',
    url: `${baseURL}/api/v1/companies/${id}/like`,
    headers: { 'Authorization': `Bearer ${getAccessToken()}` },
  }),

  dislikeCompany: (id: string) => axios({
    method: 'GET',
    url: `${baseURL}/api/v1/companies/${id}/dislike`,
    headers: { 'Authorization': `Bearer ${getAccessToken()}` },
  }),

  exportToExcel: (page: number, limit: number, filters?: IFilters) => axios({
    method: 'GET',
    url: `${baseURL}​/api/v1/companies/excel?${queryString.stringify({ page, limit, ...filters }, { arrayFormat: 'bracket' })}`,
    headers: { 'Authorization': `Bearer ${getAccessToken()}` },
  }),
};