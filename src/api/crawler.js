import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

// http response interceptors
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error.response);
  }
);

export const getIndex = async condition =>
  await api.get('/crawler', {
    params: {
      ...condition
    }
  });

export const postCrawler = async (url) =>
  await api.post('/crawler', {
    url
  });
