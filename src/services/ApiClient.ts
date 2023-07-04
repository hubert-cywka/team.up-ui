import axios from 'axios';

export const apiURL = process.env.REACT_APP_PROD_API_URL ?? 'http://localhost:8080/app';

export const apiClient = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});
