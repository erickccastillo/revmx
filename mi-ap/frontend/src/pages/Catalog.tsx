import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import { useFetchProducts } from '../hooks/useFetchProducts';
import type { Product } from '../types/Product.tsx';

const Catalog: React.FC = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const { products, loading, error, totalPages } = useFetchProducts({ page, q: query });

  return (
    <section>
      <h2>Catálogo</h2>
      <SearchBar value={query} onChange={(v) => { setQuery(v); setPage(1); }} />
      {loading && <p>Cargando productos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && <ProductList products={products as Product[]} />}
      <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Anterior</button>
        <div>Pagina {page} / {totalPages}</div>
        <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Siguiente</button>
      </div>
    </section>
  );
};

export default Catalog;
