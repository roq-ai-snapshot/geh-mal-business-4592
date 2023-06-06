import axios from 'axios';
import queryString from 'query-string';
import { ShellCompanyInterface } from 'interfaces/shell-company';
import { GetQueryInterface } from '../../interfaces';

export const getShellCompanies = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/shell-companies${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createShellCompany = async (shellCompany: ShellCompanyInterface) => {
  const response = await axios.post('/api/shell-companies', shellCompany);
  return response.data;
};

export const updateShellCompanyById = async (id: string, shellCompany: ShellCompanyInterface) => {
  const response = await axios.put(`/api/shell-companies/${id}`, shellCompany);
  return response.data;
};

export const getShellCompanyById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/shell-companies/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteShellCompanyById = async (id: string) => {
  const response = await axios.delete(`/api/shell-companies/${id}`);
  return response.data;
};
