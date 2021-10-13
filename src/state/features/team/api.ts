import axios from 'axios';

const baseURL = 'https://accelerist.herokuapp.com';
const getAccessToken = () => localStorage.getItem('token');

export const teamApi = {
  getTeam: () => axios({
    method: 'GET',
    url: `${baseURL}/api/v1/team`,
    headers: { 'Authorization': `Bearer ${getAccessToken()}` },
  }),

  getLastLogins: () => axios({
    method: 'GET',
    url: `${baseURL}/api/v1/team/last_logins`,
    headers: { 'Authorization': `Bearer ${getAccessToken()}` },
  }),
};