import { ICompany } from 'src/interfaces';

export const getFullCompanyAddress = (company: ICompany) => [
  company.street,
  company.city,
  company.state,
  company.country,
  company.zipCode
].reduce((acc, value) => value ? `${acc} ${value}` : acc, '');