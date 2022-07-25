import axios from 'axios';

const authToken = localStorage.getItem('authToken');

export const apiClient = axios.create(
  {
    baseURL: 'http://localhost:3003',
    responseType: 'json',
    headers: {'Authorization': `Bearer ${authToken}`}
  }
);