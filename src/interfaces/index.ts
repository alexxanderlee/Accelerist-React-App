export type SortType = 'alphabet' | 'last-activity' | 'available';

export interface IUser {
  id: string;
  email: string;
  firstName?: string,
  lastName?: string,
  role: string,
}

export interface IFilters {
  q?: string,
  deleteIds?: string[],
  industry?: string[],
  location?: string[],
  scope?: string,
  totalAnnualContributors?: string,
  revenueMin?: string,
  revenueMax?: string,
  csrFocusIds?: number[],
  affinities?: string[],
  gender?: 'male' | 'female' | 'both',
  ethnicities?: string[],
  ageRanges?: string[],
  income?: string[],
  sdgGoals?: string[]
}

export interface MetaData {
  totalItems: number;
  itemCount: number;
  itemsPerPage: string;
  totalPages: number;
  currentPage: string;
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
  like: boolean;
  ticker?: string;
  phone?: string;
  website?: string;
  city?: string;
  street?: string;
  state?: string;
  zipCode?: number;
  country?: string;
  descriptionList?: string;
  revenueRange?: string;
  employeeRange?: number;
  primaryIndustry?: string[];
  revenue?: number;
  employeeCount?: number;
  annualContributions?: number;
  cashContributions?: number;
  inKindContributions?: number;
  employeeContributions?: number;
  sdgGoals?: [];
  charitablePartners?: [];
  similarCompanies?: string[];
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

export interface ISelectorOption {
  label: string;
  value: string;
}
