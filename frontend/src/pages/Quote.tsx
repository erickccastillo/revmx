import React from "react";

const branches = [
  {
    id: 1,
    name: "Sucursal Base Aérea",
    address:
      "Av. Base Aerea 1273a, El Triángulo, 45138 Nuevo México, Jal.",
    phone: "+52 3315876043",
    whatsapp: "523315876043",
  },
  {
    id: 2,
    name: "Sucursal Camino Viejo",
    address:
      "Camino Viejo a Tesistan 1071A, La Casita, Los Girasoles, 45138 Zapopan, Jal.",
    phone: "+52 3323456789",
    whatsapp: "523323456789",
  },
  {
    id: 3,
    name: "Sucursal Santa Lucía",
    address:
      "Av. Juan Manuel Ruvalcaba 5250, Col. Jardines Del Valle, Santa Lucía, 45100 Tesistán, Jal.",
    phone: "+52 3334567890",
    whatsapp: "523334567890",
  },
];

const Quote: React.FC = () => {
  return (
    <section style={styles.container}>
      <div style={styles.header}>
        <div style={styles.accentLine} />

        <h1 style={styles.title}>Solicitar Cotización</h1>

        <p style={styles.subtitle}>
          Selecciona la sucursal más cercana y uno de nuestros asesores te
          atenderá directamente por WhatsApp.
        </p>
      </div>

      <div style={styles.grid}>
        {branches.map((branch) => {
          const whatsappUrl = `https://wa.me/${
            branch.whatsapp
          }?text=${encodeURIComponent(
            `Hola, me gustaría solicitar una cotización con ${branch.name}.`
          )}`;

          return (
            <div key={branch.id} style={styles.card}>
              <h2 style={styles.branchTitle}>{branch.name}</h2>

              <p style={styles.address}>
                {branch.address}
              </p>

              <p style={styles.phone}>
                📞 {branch.phone}
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style=/section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "4rem 2rem",
  },

  header: {
    textAlign: "center",
    marginBottom: "3rem",
  },

  accentLine: {
    width: "60px",
    height: "4px",
    backgroundColor: "#FFD700",
    borderRadius: "9999px",
    margin: "0 auto 1.5rem auto",
  },

  title: {
    fontSize: "2.5rem",
    fontWeight: 800,
    color: "#0a2a5e",
    marginBottom: "1rem",
  },

  subtitle: {
    color: "#6b7280",
    maxWidth: "700px",
    margin: "0 auto",
    lineHeight: 1.6,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "2rem",
  },

  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  },

  branchTitle: {
    color: "#0a2a5e",
    fontWeight: 700,
    fontSize: "1.35rem",
    marginBottom: "1rem",
  },

  address: {
    color: "#6b7280",
    lineHeight: 1.6,
    marginBottom: "1rem",
  },

  phone: {
    color: "#111827",
    fontWeight: 600,
    marginBottom: "1.5rem",
  },

  whatsappButton: {
    display: "block",
    width: "100%",
    textAlign: "center",
    padding: "14px",
    backgroundColor: "#25D366",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "10px",
    fontWeight: 700,
  },
};

export default Quote;
