import React, { useState } from "react";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (user === "admin" && password === "123456") {
      localStorage.setItem("adminToken", "logged");
      window.location.href = "/admin";
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <section style={styles.container}>
      <div style={styles.card}>
        <div style={styles.accentLine}></div>

        <h1 style={styles.title}>
          Panel Administrativo
        </h1>

        <p style={styles.subtitle}>
          Inicia sesión para administrar productos,
          inventario y contenido del catálogo.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Ingresar
          </button>
        </form>
      </div>
    </section>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "70vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },

  card: {
    width: "100%",
    maxWidth: "480px",
    background: "#ffffff",
    borderRadius: "16px",
    padding: "2.5rem",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    border: "1px solid #f3f4f6",
  },

  accentLine: {
    width: "60px",
    height: "4px",
    backgroundColor: "#FFD700",
    borderRadius: "999px",
    marginBottom: "1.5rem",
  },

  title: {
    fontSize: "2rem",
    fontWeight: 800,
    color: "#0a2a5e",
    marginBottom: "0.75rem",
  },

  subtitle: {
    color: "#6b7280",
    lineHeight: 1.6,
    marginBottom: "2rem",
  },

  input: {
    width: "100%",
    padding: "14px 16px",
    marginBottom: "1rem",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
    boxSizing: "border-box",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#0a2a5e",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontWeight: 700,
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(10,42,94,0.2)",
  },
};
