import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import AdminDashboard from './pages/AdminDashboard'; // <-- Importamos el nuevo panel
import AdminProductForm from './pages/AdminProductForm'; 
import About from './pages/About'; 
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import Login from "./pages/Login";

const App: React.FC = () => {
  return (
    <div className="app-root">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/about" element={<About />} />
          
          {/* NUEVAS RUTAS DE ADMINISTRADOR */}
          {/* 1. La tabla principal con buscador */}
          
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} /> 
          
          {/* 2. El formulario en modo "Crear nuevo" */}
          <Route path="/admin/new" element={<AdminProductForm />} /> 
          
          {/* 3. El formulario en modo "Editar" (acepta un ID) */}
          <Route path="/admin/edit/:id" element={<AdminProductForm />} /> 
          
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
