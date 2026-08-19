import React from 'react';

const About: React.FC = () => {
  // Datos de las 4 sucursales en Guadalajara
  const branches = [
    {
      id: 1,
      name: 'Sucursal Base Aerea',
      address: 'Av. Base Aerea 1273a, El Triángulo, 45138 Nuevo México, Jal.',
      phone: '+52 3315876043',
      hours: 'Lunes a Viernes: 9:00 AM - 6:00 PM | Sábado: 9:00 AM - 3:00 PM',
      // Pega aquí la URL que viene dentro del src="..." del iframe de Google Maps
      mapSrc: 'https://maps.app.goo.gl/1txb84sZAzqRWvjb9', 
    },
    {
      id: 2,
      name: 'Sucursal Camino Viejo',
      address: 'Camino Viejo a Tesistan 1071A, La Casita, Los Girasoles, 45138 Zapopan, Jal.',
      phone: '+52 (33) 2345-6789',
      hours: 'Lunes a Viernes: 9:00 AM - 6:00 PM | Sábado: 9:00 AM - 3:00 PM',
      mapSrc: 'https://maps.app.goo.gl/RRsvPscopwZpnyEz9', // Reemplazar
    },
    {
      id: 3,
      name: 'Sucursal Santa Lucia',
      address: 'Av. Juan Manuel Ruvalcaba 5250, Col. Jardines Del Valle, Santa Lucía, 45100 Tesistán, Jal.',
      phone: '+52 (33) 3456-7890',
      hours: 'Lunes a Viernes: 9:00 AM - 6:00 PM | Sábado: 9:00 AM - 3:00 PM',
      mapSrc: 'https://maps.app.goo.gl/HwdXdYWuz4emVnF36', // Reemplazar
    },
  ];

  return (
    <div style={styles.pageWrapper}>
      {/* Encabezado Hero */}
      <header style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h2 style={styles.sectionOverline}>NUESTRA HISTORIA</h2>
          <h1 style={styles.heroTitle}>
            Creando hogares con <span style={styles.textHighlight}>identidad.</span>
          </h1>
          <div style={styles.accentLineCentered}></div>
          <p style={styles.heroSubtitle}>
            Somos líderes en la distribución de pisos, azulejos, baños y 
            complementos del hogar, combinando calidad de clase mundial con el diseño que tu espacio merece.
          </p>
        </div>
      </header>

      {/* Sección de Descripción de la Empresa */}
      <section style={styles.descriptionSection}>
        <div style={styles.descriptionContainer}>
          <h2 style={styles.sectionTitleDark}>Mucho más que recubrimientos</h2>
          <p style={styles.descriptionText}>
            En <strong>Revestimento</strong> entendemos que cada rincón de tu hogar cuenta una historia. 
            No solo vendemos materiales; ofrecemos soluciones integrales de interiorismo y arquitectura. 
            Nuestro catálogo abarca desde las tendencias europeas más vanguardistas en <strong>pisos y azulejos</strong>, 
            hasta <strong>muebles de baño de lujo, grifería de alta tecnología y productos para el hogar</strong> que 
            convierten una casa en un verdadero santuario.
          </p>
          <p style={styles.descriptionText}>
            Con un equipo de asesores especializados, te acompañamos desde la inspiración 
            hasta la instalación, asegurando que tu proyecto residencial o comercial cumpla 
            con los más estrictos estándares de calidad.
          </p>
        </div>
      </section>

      {/* Sección de Sucursales */}
      <section style={styles.locationsSection}>
        <div style={styles.locationsHeader}>
          <h2 style={styles.sectionOverlineDark}>VISÍTANOS EN GUADALAJARA</h2>
          <h1 style={styles.sectionTitleDark}>Nuestras Sucursales</h1>
        </div>

        <div style={styles.locationsGrid}>
          {branches.map((branch) => (
            <div key={branch.id} style={styles.branchCard}>
              <div style={styles.branchInfo}>
                <h3 style={styles.branchName}>{branch.name}</h3>
                
                {/* Icono + Dirección */}
                <div style={styles.infoRow}>
                  <span style={styles.icon}>📍</span>
                  <p style={styles.infoText}>{branch.address}</p>
                </div>
                
                {/* Icono + Teléfono */}
                <div style={styles.infoRow}>
                  <span style={styles.icon}>📞</span>
                  <p style={styles.infoText}>{branch.phone}</p>
                </div>

                {/* Icono + Horario */}
                <div style={styles.infoRow}>
                  <span style={styles.icon}>🕒</span>
                  <p style={styles.infoText}>{branch.hours}</p>
                </div>
              </div>

              {/* Contenedor del Mapa */}
              <div style={styles.mapContainer}>
                {branch.mapSrc ? (
                  <iframe
                    title={`Mapa de ${branch.name}`}
                    src={branch.mapSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                ) : (
                  <div style={styles.mapPlaceholder}>
                    <p>Mapa no disponible</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// --- ESTILOS ---
const styles: { [key: string]: React.CSSProperties } = {
  pageWrapper: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#ffffff',
  },
  
  // Hero Section
  heroSection: {
    backgroundColor: '#111827', // Gris Carbón / Azul Medianoche
    padding: '120px 5% 60px 5%', // Padding superior alto para no quedar debajo del Header fijo
    textAlign: 'center',
    color: '#ffffff',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  sectionOverline: {
    fontSize: '0.875rem',
    letterSpacing: '2px',
    marginBottom: '1rem',
    color: '#e1b71f',
    fontWeight: 700,
  },
  heroTitle: {
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    marginBottom: '1.5rem',
    fontWeight: 800,
    color: '#ffffff',
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
  },
  textHighlight: {
    color: '#e1b71f', // Toque dorado en el título
  },
  accentLineCentered: {
    width: '60px',
    height: '4px',
    backgroundColor: '#e1b71f',
    margin: '0 auto 2rem auto',
    borderRadius: '2px',
  },
  heroSubtitle: {
    fontSize: '1.15rem',
    lineHeight: 1.6,
    color: '#9ca3af',
  },

  // Description Section
  descriptionSection: {
    backgroundColor: '#ffffff',
    padding: '6rem 5%',
  },
  descriptionContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  sectionTitleDark: {
    fontSize: '2.5rem',
    lineHeight: 1.2,
    marginBottom: '2rem',
    fontWeight: 800,
    color: '#111827',
    letterSpacing: '-0.02em',
  },
  descriptionText: {
    fontSize: '1.125rem',
    lineHeight: 1.8,
    color: '#4b5563',
    marginBottom: '1.5rem',
  },

  // Locations Section
  locationsSection: {
    backgroundColor: '#f8fafc', // Gris perla limpio
    padding: '6rem 5%',
  },
  locationsHeader: {
    textAlign: 'center',
    marginBottom: '4rem',
  },
  sectionOverlineDark: {
    fontSize: '0.875rem',
    letterSpacing: '2px',
    marginBottom: '0.5rem',
    color: '#e1b71f',
    fontWeight: 700,
  },
  locationsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2.5rem',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  
  // Cards de Sucursales
  branchCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
    border: '1px solid #f1f5f9',
    display: 'flex',
    flexDirection: 'column',
  },
  branchInfo: {
    padding: '2rem',
    flexGrow: 1,
  },
  branchName: {
    fontSize: '1.25rem',
    fontWeight: 800,
    color: '#111827',
    marginBottom: '1.5rem',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    marginBottom: '1rem',
  },
  icon: {
    fontSize: '1.1rem',
    lineHeight: 1,
  },
  infoText: {
    fontSize: '0.95rem',
    color: '#64748b',
    lineHeight: 1.5,
    margin: 0,
  },
  mapContainer: {
    width: '100%',
    height: '250px', // Altura del recuadro del mapa
    backgroundColor: '#e5e7eb',
    borderTop: '1px solid #f1f5f9',
  },
  mapPlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9ca3af',
    fontSize: '0.9rem',
    backgroundColor: '#f3f4f6',
  },
};

export default About;