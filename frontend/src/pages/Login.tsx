// src/pages/Login.tsx

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://tu-backend.onrender.com/auth/login",
        {
          username,
          password,
        }
      );

      localStorage.setItem(
        "adminToken",
        response.data.token
      );

      navigate("/admin");
    } catch {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Usuario"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
      />

      <button type="submit">
        Ingresar
      </button>
    </form>
  );
}
``
