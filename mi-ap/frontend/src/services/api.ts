// src/services/api.ts
import axios, { AxiosInstance } from 'axios';

const baseURL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:4000';

const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

export type ProductsResponse = {
  data: any[];
  page?: number;
  totalPages?: number;
  total?: number;
};

export const getProducts = async (params?: { page?: number; q?: string; limit?: number }) => {
  try {
    const res = await api.get('/products', { params });
    return res.data as ProductsResponse;
  } catch (err: any) {
    // Normaliza el error para el frontend
    const message = err?.response?.data?.message || err.message || 'Error en la petición';
    throw new Error(message);
  }
};

export default api;
