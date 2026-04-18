import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <section>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <h1>Bienvenido a Mi Tienda</h1>
          <p style={{ color: 'var(--muted)' }}>
            Catálogo de productos con búsqueda y paginación. Construida con React, TypeScript y Vite.
          </p>
          <Link to="/catalog" style={{ background: 'var(--primary)', color: '#fff', padding: '0.6rem 1rem', borderRadius: 6 }}>
            Ver catálogo
          </Link>
        </div>
        <div style={{ width: 320 }}>
          <img src="/placeholder-hero.png" alt="hero" style={{ width: '100%', borderRadius: 8 }} />
        </div>
      </div>
    </section>
  );
};

export default Home;
