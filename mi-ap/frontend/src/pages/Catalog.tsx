import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import { useFetchProducts } from '../hooks/useFetchProducts';
import type { Product } from '../types/Product';

const Catalog: React.FC = () => {
  const [query, setQuery] = useState('');
  const { products, loading, error } = useFetchProducts({ q: query });

  return (
    <section>
      <h2>Catálogo</h2>
      <SearchBar value={query} onChange={(v) => setQuery(v)} />
      {loading && <p>Cargando productos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && <ProductList products={products} />}
    </section>
  );
};


export default Catalog;
