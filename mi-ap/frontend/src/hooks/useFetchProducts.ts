import { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import type { Product } from '../types/Product';

type Params = { q?: string };

export const useFetchProducts = (params: Params) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProducts(params);

        // Debug: imprime la respuesta completa del backend
        console.log('Respuesta completa del backend:', data);

        // Debug: imprime solo el array de productos
        console.log('Productos recibidos:', data.data);

        // Tu backend devuelve { data: [...] }
        if (mounted) {
          setProducts(data.data || []);
        }
      } catch (err: any) {
        console.error('Error en useFetchProducts:', err);
        setError(err.message || 'Error al cargar productos');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, [params?.q]);

  return { products, loading, error };
};
