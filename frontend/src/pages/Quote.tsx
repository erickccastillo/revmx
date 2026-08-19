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
        <div style={styles.accentLine}></div>

        <h1 style={styles.title}>
          Solicitar Cotización
        </h1>

        <p style={styles.subtitle}>
          Selecciona la sucursal más cercana a ti y uno de nuestros asesores te
          atenderá directamente por WhatsApp.
        </p>
      </div>

      <div style={styles.grid}>
        {branches.map((branch) => (
          <div key={branch.id} style={styles.card}>
            <h2 style={styles.branchTitle}>
              {branch.name}
            </h2>

            <p style={styles.address}>
              {branch.address}
            </p>

            <div style={styles.info}>
              📞 {branch.phone}
            </div>

            <a
              href={`https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(
                `Hola, me gustarípener noreferrer"
              style={styles.whatsappButton}
            >
              Solicitar por WhatsApp
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

