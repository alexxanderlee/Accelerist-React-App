import axios from 'axios';

const baseURL = 'https://accelerist.herokuapp.com';
const getAccessToken = () => localStorage.getItem('token');

export const companiesApi = {
  getFavouriteCompanies: (page: number, limit: number) => axios({
    method: 'GET',
    url: `${baseURL}/api/v1/companies/favorites?page=${page}&limit=${limit}`,
    headers: { 'Authorization': `Bearer ${getAccessToken()}` },
  }),
};