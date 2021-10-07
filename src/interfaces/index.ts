export interface FetchError {
  statusCode?: number;
  error: string;
  message: string;
}

export interface IUser {
  id: string;
  email: string;
  firstName?: string,
  lastName?: string,
  role: string,
}

interface IFilters {
  [key: string]: string;
}

export interface IProspect {
  id: string,
  name: string,
  filters: IFilters,
  prospectsAvailable: number,
  lastAuthor: IUser,
  createdAt: string,
  updatedAt: string,
}

export interface ICompany {
  id: string;
  name: string;
  logo?: string;
  score: number;
  crsFocus: string[];
}

export interface ITeam {
  id: string;
  searchCount: number,
  pitchCount: number,
}

export interface ILastLogin {
  id: string;
  loggedInAt: string;
  user: IUser;
}