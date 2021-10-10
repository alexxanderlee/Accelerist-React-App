import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://accelerist.herokuapp.com',
  headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
});

export const teamApi = {
  getTeam: () => axiosInstance.get('/api/v1/team'),
  getLastLogins: () => axiosInstance.get('/api/v1/team/last_logins'),
};