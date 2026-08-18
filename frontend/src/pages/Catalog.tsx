import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import { useFetchProducts } from '../hooks/useFetchProducts';
import type { Product } from '../types/Product';

const Catalog: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('TODOS');
  const [page, setPage] = useState(1);

  const { products, loading, error, totalPages, totalProducts } = useFetchProducts({
    page,
    q: query,
    category,
  });

  const categories = ['TODOS', 'PISOS', 'MUROS','CERAMICO','MPB', 'AZULEJOS', 'DECORATIVOS', 'MONOMANDOS', 'MEZCLADORAS', 'LAVABOS'];

  // Función auxiliar para subir al inicio al cambiar de página
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#0a2a5e' }}>
        CATÁLOGO
      </h2>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#FFD700' }}>
        Nuestra colección completa
      </h3>
      <p style={{ marginBottom: '2rem', color: '#555', fontSize: '1rem' }}>
        Pisos y azulejos seleccionados pieza por pieza. Filtra por categoría o busca por nombre.
      </p>

      <SearchBar
        value={query}
        onChange={(v) => {
          setQuery(v);
          setPage(1); // Reiniciar a la página 1 cuando se busca algo nuevo
        }}
      />

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '1.5rem 0' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCategory(cat);
              setPage(1); // Reiniciar a la página 1 cuando se cambia de categoría
            }}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: category === cat ? '2px solid #FFD700' : '1px solid #ccc',
              backgroundColor: category === cat ? '#FFD700' : '#fff',
              color: category === cat ? '#0a2a5e' : '#333',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && <p>Cargando productos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {!loading && !error && <ProductList products={products as Product[]} />}

      {/* Controles de Paginación */}
      {!loading && !error && totalProducts > 0 && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginTop: '3rem',
          paddingTop: '1rem',
          borderTop: '1px solid #eaeaea' 
        }}>
          
          <div style={{ fontWeight: 500, color: '#666' }}>
            Mostrando {products?.length ?? 0} de {totalProducts ?? 0} productos
          </div>

          {/* Botones solo se muestran si hay más de 1 página */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                onClick={() => {
                  setPage((p) => Math.max(1, p - 1));
                  scrollToTop();
                }}
                disabled={page === 1}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  backgroundColor: page === 1 ? '#f5f5f5' : '#fff',
                  color: page === 1 ? '#999' : '#333',
                  cursor: page === 1 ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                }}
              >
                Anterior
              </button>

              <span style={{ fontWeight: 600, color: '#0a2a5e' }}>
                Página {page} de {totalPages}
              </span>

              <button
                onClick={() => {
                  setPage((p) => Math.min(totalPages, p + 1));
                  scrollToTop();
                }}
                disabled={page === totalPages}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  backgroundColor: page === totalPages ? '#f5f5f5' : '#fff',
                  color: page === totalPages ? '#999' : '#333',
                  cursor: page === totalPages ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                }}
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Catalog;
