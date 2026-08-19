import React from 'react';
import { Link } from 'react-router-dom';
import { useFeaturedProducts } from '../hooks/useFeaturedProducts';

// IMPORTANTE: Para asegurar que la imagen cargue, expórtala así si está en src:
// import homeBg from '../images/home.png'; 
// (Si usas el import, cambia la línea de backgroundImage a: `url(${homeBg})`)

const Home: React.FC = () => {
  const { products, loading } = useFeaturedProducts();

  return (
    <div style={styles.pageWrapper}>
      {/* Hero principal */}
      <main style={styles.heroSection}>
        <div style={styles.heroBackground} />
        
        <div style={styles.heroContent}>
          <div style={styles.badge}>
            <span style={styles.badgeDot}></span>
            PISOS Y AZULEJOS · DESDE 1988
          </div>
          
          <h1 style={styles.heroTitle}>
            Revestimientos que <br/>
            <span style={styles.textHighlight}>transforman espacios.</span>
          </h1>
          
          <p style={styles.heroSubtitle}>
            Selección curada de pisos y azulejos para hogares y proyectos que buscan elegancia, calidad y carácter.
          </p>

          <div style={styles.heroButtons}>
            <Link to="/catalog" style={styles.primaryButton}>
              VER CATÁLOGO &rarr;
            </Link>
            <Link to="/about" style={styles.secondaryButtonHero}>
              CONÓCENOS
            </Link>
          </div>
        </div>
      </main>

      {/* Sección Sobre Nosotros */}
      <section style={styles.aboutSection}>
        <div style={styles.aboutContainer}>
          <h2 style={styles.sectionOverline}>SOBRE NOSOTROS</h2>
          <h1 style={styles.sectionTitleDark}>Calidad sin concesiones, diseño con propósito.</h1>
          <div style={styles.accentLineCentered}></div>
          <p style={styles.aboutText}>
            En Revestimento creemos que un piso o azulejo es mucho más que un material: 
            es la base que define la atmósfera de cada espacio. Trabajamos con fabricantes 
            europeos y artesanos locales para ofrecerte piezas que combinan durabilidad, 
            estética contemporánea y un servicio cercano.
          </p>
        </div>
      </section>

      {/* Sección Destacados */}
      <section style={styles.featuredSection}>
        <div style={styles.featuredHeader}>
          <div>
            <h2 style={styles.sectionOverline}>DESTACADOS</h2>
            <h1 style={styles.sectionTitleDark}>Colecciones del momento</h1>
          </div>
          <Link to="/catalog" style={styles.textLink}>
            Ver todo el catálogo &rarr;
          </Link>
        </div>

        {loading ? (
          <div style={styles.loadingContainer}>
             <div style={styles.spinner}></div>
             <p>Cargando colecciones...</p>
          </div>
        ) : (
          <div style={styles.productsGrid}>
            {products.map((p) => (
              <div key={p.id} style={styles.productCard}>
                <div style={styles.cardImageWrapper}>
                  <img src={p.image_url} alt={p.name} style={styles.cardImage} />
                  <div style={styles.categoryTag}>{p.category}</div>
                </div>
                <div style={styles.cardBody}>
                  <h3 style={styles.cardTitle}>{p.name}</h3>
                  <p style={styles.cardDescription}>{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Sección Beneficios */}
      <section style={styles.benefitsSection}>
        <div style={styles.benefitsGrid}>
          <div style={styles.benefitItem}>
            <div style={styles.iconWrapper}>🎨</div>
            <h3 style={styles.benefitTitle}>Diseño curado</h3>
            <p style={styles.benefitText}>Cada pieza es seleccionada por nuestro equipo de diseño.</p>
          </div>
          <div style={styles.benefitItem}>
            <div style={styles.iconWrapper}>🛡️</div>
            <h3 style={styles.benefitTitle}>Garantía total</h3>
            <p style={styles.benefitText}>Materiales certificados con garantía extendida de 10 años.</p>
          </div>
          <div style={styles.benefitItem}>
            <div style={styles.iconWrapper}>⚡</div>
            <h3 style={styles.benefitTitle}>Entrega ágil</h3>
            <p style={styles.benefitText}>Logística propia para entregas rápidas en obra.</p>
          </div>
        </div>
      </section>

      {/* Sección Call to Action */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <div>
            <h1 style={styles.ctaTitle}>¿Listo para diseñar tu espacio?</h1>
            <p style={styles.ctaSubtitle}>Explora nuestro catálogo completo y encuentra la pieza perfecta.</p>
          </div>
          <div style={styles.ctaButtonWrapper}>
            <Link to="/catalog" style={styles.primaryButton}>
              EXPLORAR CATÁLOGO &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- ESTILOS ---
const styles: { [key: string]: React.CSSProperties } = {
  pageWrapper: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  // Hero
  heroSection: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: '#fff',
    overflow: 'hidden',
    padding: '80px 5% 40px 10%', 
  },
  heroBackground: {
    position: 'absolute',
    inset: 0,
    // El gradiente superpuesto ayuda a que el texto blanco sea siempre legible, sin importar la foto.
    backgroundImage: 'linear-gradient(to right, rgba(10, 42, 94, 0.9) 0%, rgba(10, 42, 94, 0.4) 100%), url("/src/images/home.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: -1,
  },
  heroContent: {
    maxWidth: '800px',
    position: 'relative',
    zIndex: 1,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.85rem',
    letterSpacing: '2px',
    fontWeight: 600,
    color: '#e6c400',
    backgroundColor: 'rgba(230, 196, 0, 0.1)',
    padding: '6px 12px',
    borderRadius: '4px',
    marginBottom: '2rem',
  },
  badgeDot: {
    width: '6px',
    height: '6px',
    backgroundColor: '#e6c400',
    borderRadius: '50%',
  },
  heroTitle: {
    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', // Responsivo natural
    marginBottom: '1.5rem',
    fontWeight: 800,
    color: '#ffffff',
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
  },
  textHighlight: {
    color: '#f8f9fa',
    opacity: 0.9,
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    marginBottom: '3rem',
    lineHeight: 1.6,
    color: '#e2e8f0',
    maxWidth: '600px',
  },
  heroButtons: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  primaryButton: {
    backgroundColor: '#e1b71f',
    color: '#0a2a5e',
    padding: '1rem 2rem',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: '1rem',
    boxShadow: '0 4px 14px rgba(225, 183, 31, 0.4)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    display: 'inline-block',
    textAlign: 'center',
  },
  secondaryButtonHero: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    padding: '1rem 2rem',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 600,
    border: '1px solid rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(4px)',
    transition: 'background-color 0.2s',
    display: 'inline-block',
    textAlign: 'center',
  },
  
  // Secciones Generales
  sectionOverline: {
    fontSize: '0.875rem',
    letterSpacing: '2px',
    marginBottom: '0.5rem',
    color: '#c9a200',
    fontWeight: 700,
  },
  sectionTitleDark: {
    fontSize: '2.5rem',
    marginBottom: '1.5rem',
    fontWeight: 800,
    color: '#0a2a5e',
    letterSpacing: '-0.02em',
  },
  accentLineCentered: {
    width: '60px',
    height: '4px',
    backgroundColor: '#e1b71f',
    margin: '0 auto 2rem auto',
    borderRadius: '2px',
  },

  // Sobre Nosotros
  aboutSection: {
    backgroundColor: '#f5f0e8',
    padding: '6rem 2rem',
    textAlign: 'center',
  },
  aboutContainer: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  aboutText: {
    fontSize: '1.2rem',
    lineHeight: 1.8,
    color: '#4b5563',
  },

  // Destacados
  featuredSection: {
    backgroundColor: '#ffffff',
    padding: '6rem 5%',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  featuredHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '3rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  textLink: {
    color: '#0a2a5e',
    fontWeight: 600,
    textDecoration: 'none',
    borderBottom: '2px solid #e1b71f',
    paddingBottom: '2px',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2.5rem',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.01)',
    border: '1px solid #f3f4f6',
    transition: 'transform 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
  },
  cardImageWrapper: {
    position: 'relative',
    height: '240px',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  categoryTag: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: '#0a2a5e',
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '1px',
  },
  cardBody: {
    padding: '1.5rem',
    flexGrow: 1,
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#111827',
    marginBottom: '0.5rem',
  },
  cardDescription: {
    fontSize: '0.95rem',
    color: '#6b7280',
    lineHeight: 1.5,
  },

  // Beneficios
  benefitsSection: {
    backgroundColor: '#f9f9f9',
    padding: '5rem 5%',
  },
  benefitsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '3rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  benefitItem: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
  },
  iconWrapper: {
    width: '64px',
    height: '64px',
    margin: '0 auto 1.5rem auto',
    backgroundColor: '#f5f0e8',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.75rem',
  },
  benefitTitle: {
    fontWeight: 700,
    fontSize: '1.25rem',
    color: '#0a2a5e',
    marginBottom: '0.75rem',
  },
  benefitText: {
    color: '#6b7280',
    lineHeight: 1.6,
  },

  // CTA
  ctaSection: {
    backgroundColor: '#0a2a5e',
    padding: '5rem 5%',
  },
  ctaContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '2rem',
  },
  ctaTitle: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
    fontWeight: 800,
    color: '#ffffff',
    letterSpacing: '-0.02em',
  },
  ctaSubtitle: {
    fontSize: '1.15rem',
    color: '#9ca3af',
  },
  ctaButtonWrapper: {
    flexShrink: 0,
  },
  
  // Utilidades
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 0',
    color: '#6b7280',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #f3f4f6',
    borderTopColor: '#e1b71f',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '1rem',
  },
};

export default Home;