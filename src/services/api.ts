import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: async (data: any) => {
    const response = await api.post('/users/register', data);
    return response.data;
  },

  login: async (data: any) => {
    const response = await api.post('/users/login', data);
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  verifyEmail: async (token: string) => {
    const response = await api.get(`/users/verify/${token}`);
    return response.data;
  },
};

export const urlAPI = {
  create: async (data: any) => {
    const response = await api.post('/urls', data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/urls');
    return response.data;
  },

  update: async (id: string, data: any) => {
    const response = await api.put(`/urls/${id}`, data);
    return response.data;
  },

  getByCustomPath: async (customPath: string) => {
    const response = await api.get(`/urls/redirect/${customPath}`);
    return response.data;
  },
};

export default api;