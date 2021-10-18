export interface FetchError {
  statusCode?: number;
  error: string;
  message: string;
}

export interface UserData {
  id: string;
  email: string;
  token: string;
}