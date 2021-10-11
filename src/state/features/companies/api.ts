import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://accelerist.herokuapp.com',
  headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
});

export const companiesApi = {
  getFavouriteCompanies: (page: number, limit: number) => axiosInstance
    .get(`/api/v1/companies/favorites?page=${page}&limit=${limit}`),
};