import axios from 'axios';

const baseUrl = 'https://accelerist.herokuapp.com';

export const userApi = {
  login: (email: string, password: string) => axios({
    method: 'POST',
    url: `${baseUrl}/api/v1/auth/sign_in`,
    data: { email, password },
  }),
  signup: (email: string, password: string) => axios({
    method: 'POST',
    url: `${baseUrl}/api/v1/auth/sign_up`,
    data: { email, password },
  }),
  sendMail: (email: string) => axios({
    method: 'POST',
    url: `${baseUrl}/api/v1/auth/change_password/send_mail`,
    data: { email },
  }),
  changePassword: (password: string, resetToken: string | string[] | null) => axios({
    method: 'POST',
    url: `${baseUrl}/api/v1/auth/change_password/change`,
    data: { password, passwordConfirmation: password },
    headers: { 'Authorization': `Bearer ${resetToken}` }
  }),
};
