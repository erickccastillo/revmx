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

  const categories = [
    'TODOS', 'PISOS', 'MUROS', 'CERÁMICO', 'MPB', 
    'AZULEJOS', 'DECORATIVOS', 'MONOMANDOS', 'MEZCLADORAS', 'LAVABOS'
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section style={styles.container}>
      {/* Cabecera del Catálogo */}
      <div style={styles.header}>
        <div style={styles.accentLine}></div>
        <h2 style={styles.title}>Catálogo de Productos</h2>
        <p style={styles.subtitle}>
          Explora nuestra colección completa. Pisos y azulejos seleccionados pieza por pieza para tus proyectos.
        </p>
      </div>

      {/* Panel de Controles (Búsqueda y Filtros) */}
      <div style={styles.controlsCard}>
        <div style={styles.searchWrapper}>
          <SearchBar
            value={query}
            onChange={(v) => {
              setQuery(v);
              setPage(1);
            }}
          />
        </div>

        <div style={styles.categoriesWrapper}>
          {categories.map((cat) => {
            const isActive = category === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setPage(1);
                }}
                style={{
                  ...styles.categoryButton,
                  backgroundColor: isActive ? '#0a2a5e' : '#f3f4f6',
                  color: isActive ? '#ffffff' : '#4b5563',
                  borderColor: isActive ? '#0a2a5e' : '#e5e7eb',
                  boxShadow: isActive ? '0 4px 6px -1px rgba(10, 42, 94, 0.2)' : 'none',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Estados de Carga y Error */}
      {loading && (
        <div style={styles.statusMessage}>
          <div style={styles.spinner}></div>
          <p>Cargando nuestro catálogo...</p>
        </div>
      )}
      
      {error && (
        <div style={styles.errorMessage}>
          <span style={{ fontWeight: 'bold' }}>¡Ups! Ha ocurrido un error:</span> {error}
        </div>
      )}

      {/* Lista de Productos */}
      {!loading && !error && (
        <div style={styles.productSection}>
          <ProductList products={products as Product[]} />
        </div>
      )}

      {/* Controles de Paginación */}
      {!loading && !error && totalProducts > 0 && (
        <div style={styles.paginationContainer}>
          <div style={styles.paginationInfo}>
            Mostrando <span style={styles.highlightText}>{products?.length ?? 0}</span> de <span style={styles.highlightText}>{totalProducts ?? 0}</span> productos
          </div>

          {totalPages > 1 && (
            <div style={styles.paginationControls}>
              <button
                onClick={() => {
                  setPage((p) => Math.max(1, p - 1));
                  scrollToTop();
                }}
                disabled={page === 1}
                style={{
                  ...styles.pageButton,
                  opacity: page === 1 ? 0.5 : 1,
                  cursor: page === 1 ? 'not-allowed' : 'pointer',
                }}
              >
                ← Anterior
              </button>

              <div style={styles.pageIndicator}>
                Página <span style={{ fontWeight: 700, color: '#0a2a5e' }}>{page}</span> de {totalPages}
              </div>

              <button
                onClick={() => {
                  setPage((p) => Math.min(totalPages, p + 1));
                  scrollToTop();
                }}
                disabled={page === totalPages}
                style={{
                  ...styles.pageButton,
                  opacity: page === totalPages ? 0.5 : 1,
                  cursor: page === totalPages ? 'not-allowed' : 'pointer',
                }}
              >
                Siguiente →
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

// Objeto de estilos para mantener el JSX limpio
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '4rem 2rem',
    maxWidth: '1280px',
    margin: '0 auto',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  accentLine: {
    width: '60px',
    height: '4px',
    backgroundColor: '#FFD700',
    borderRadius: '2px',
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 800,
    color: '#0a2a5e',
    margin: '0 0 1rem 0',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '1.125rem',
    color: '#6b7280',
    maxWidth: '600px',
    lineHeight: 1.6,
    margin: 0,
  },
  controlsCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
    border: '1px solid #f3f4f6',
    marginBottom: '3rem',
  },
  searchWrapper: {
    maxWidth: '600px',
    margin: '0 auto 2rem auto',
  },
  categoriesWrapper: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  categoryButton: {
    padding: '0.5rem 1.25rem',
    borderRadius: '9999px', // Forma de píldora
    border: '1px solid',
    fontSize: '0.875rem',
    fontWeight: 600,
    transition: 'all 0.2s ease',
  },
  productSection: {
    minHeight: '400px', // Evita que el layout salte mucho mientras carga
  },
  statusMessage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 0',
    color: '#6b7280',
    fontSize: '1.125rem',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #f3f4f6',
    borderTopColor: '#0a2a5e',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '1rem',
  },
  errorMessage: {
    backgroundColor: '#fef2f2',
    color: '#991b1b',
    padding: '1rem 1.5rem',
    borderRadius: '8px',
    border: '1px solid #f87171',
    textAlign: 'center',
    margin: '2rem 0',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '4rem',
    paddingTop: '2rem',
    borderTop: '1px solid #e5e7eb',
    flexWrap: 'wrap',
    gap: '1.5rem',
  },
  paginationInfo: {
    fontSize: '0.95rem',
    color: '#6b7280',
  },
  highlightText: {
    fontWeight: 700,
    color: '#111827',
  },
  paginationControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  pageButton: {
    padding: '0.5rem 1.25rem',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
    color: '#374151',
    fontWeight: 600,
    fontSize: '0.9rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    transition: 'all 0.2s',
  },
  pageIndicator: {
    fontSize: '0.95rem',
    color: '#6b7280',
    minWidth: '100px',
    textAlign: 'center',
  },
};

export default Catalog;