import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Header from './components/Header';
import Footer from './components/Footer';
import Admin from './pages/AdminProductForm';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app-root">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/admin" element={<Admin />} />
          
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
