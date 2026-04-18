import { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import type { Product } from '../types/Product.tsx';

type Params = { page?: number; q?: string; limit?: number };

export const useFetchProducts = (params: Params) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProducts(params);
        // Si tu API devuelve { data, page, totalPages } ajusta:
        if (Array.isArray(data)) {
          setProducts(data as Product[]);
          setTotalPages(1);
        } else {
          setProducts((data as any).data || []);
          setTotalPages((data as any).totalPages || 1);
        }
      } catch (err: any) {
        setError(err.message || 'Error al cargar productos');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, [params?.page, params?.q, params?.limit]);

  return { products, loading, error, totalPages };
};
