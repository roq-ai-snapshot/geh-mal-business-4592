import axios from 'axios';
import queryString from 'query-string';
import { SoftwareInterface } from 'interfaces/software';
import { GetQueryInterface } from '../../interfaces';

export const getSoftware = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/software${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSoftware = async (software: SoftwareInterface) => {
  const response = await axios.post('/api/software', software);
  return response.data;
};

export const updateSoftwareById = async (id: string, software: SoftwareInterface) => {
  const response = await axios.put(`/api/software/${id}`, software);
  return response.data;
};

export const getSoftwareById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/software/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSoftwareById = async (id: string) => {
  const response = await axios.delete(`/api/software/${id}`);
  return response.data;
};
