import { AxiosResponse, AxiosError } from 'axios';
import { FetchError, IUser, ITeam, ILastLogin } from 'src/interfaces';

const normalize = {
  error: (error: AxiosError): FetchError => error.response
    ? error.response.data
    : { error: error.name, message: error.message },
  authData: (res: AxiosResponse): { user: IUser, token: string } => ({
    user: {
      id: res.data.user.id,
      email: res.data.user.email,
      firstName: res.data.user.firstName,
      lastName: res.data.user.lastName,
      role: res.data.user.role,
    },
    token: res.data.accessToken,
  }),
};

export default normalize;