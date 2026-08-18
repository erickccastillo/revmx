import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Inicializa Supabase en tu frontend
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const AdminProductForm: React.FC = () => {
  // Estados para el formulario
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [category, setCategory] = useState('PISOS');
  
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Selecciona una imagen');
    if (!name || !price) return alert('El nombre y el precio son obligatorios');

    setUploading(true);
    try {
      // 1. Generar nombre único para el archivo
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
      const filePath = `catalog/${fileName}`;

      // 2. Subir imagen a Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 3. Obtener la URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      // 4. Enviar datos al backend
      const productData = {
        name,
        description,
        price: Number(price),
        category,
        image_url: publicUrl,
      };

      // Apuntamos al backend local (asegúrate de que el puerto sea el correcto)
      const response = await fetch('http://localhost:3001/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!response.ok) throw new Error('Error en el servidor al guardar el producto');

      alert('¡Producto creado con éxito!');
      
      // Limpiar el formulario
      setName('');
      setDescription('');
      setPrice('');
      setCategory('PISOS');
      setFile(null);
      // Resetear el input file (opcional pero recomendado)
      (document.getElementById('fileInput') as HTMLInputElement).value = '';

    } catch (error) {
      console.error('Error al subir:', error);
      alert('Hubo un error al crear el producto');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
      
      <div>
        <label>Nombre del Producto:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%' }}/>
      </div>

      <div>
        <label>Descripción:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: '100%' }} />
      </div>

      <div>
        <label>Precio:</label>
        <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required style={{ width: '100%' }}/>
      </div>

      <div>
        <label>Categoría:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%' }}>
          <option value="PISOS">Pisos</option>
          <option value="AZULEJOS">Azulejos</option>
          <option value="DECORATIVOS">Decorativos</option>
          <option value="MONOMANDOS">Monomandos</option>
          <option value="MEZCLADORAS">Mezcladoras</option>
        </select>
      </div>

      <div>
        <label>Imagen del Producto:</label>
        <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      
      <button type="submit" disabled={uploading} style={{ padding: '0.5rem', backgroundColor: '#0a2a5e', color: 'white', border: 'none', cursor: 'pointer' }}>
        {uploading ? 'Subiendo...' : 'Guardar Producto'}
      </button>

    </form>
  );
};

export default AdminProductForm;