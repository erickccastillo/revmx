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


export async function getProducts(params: { q?: string }) {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
    params: { search: params.q }
  });
  return res.data; // { data: [...] }
}


export default api;
