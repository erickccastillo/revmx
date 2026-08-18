import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
// 1. Importa tu componente del formulario administrador
import AdminProductForm from './pages/AdminProductForm'; 
import Header from './components/Header';
import Footer from './components/Footer';

import './App.css';

const App: React.FC = () => {
  return (
    <div className="app-root">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          
          {/* 2. Agrega la nueva ruta para el panel */}
          <Route path="/admin" element={<AdminProductForm />} />
          <Route path="/admin/edit/:id" element={<AdminProductForm />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;