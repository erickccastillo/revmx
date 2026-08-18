import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './AdminProductForm.css'; // <-- Importamos nuestros nuevos estilos

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const AdminProductForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [category, setCategory] = useState('PISOS');
  
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null); // Estado para la vista previa
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      // Creamos una URL temporal para mostrar la imagen antes de subirla
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Por favor, selecciona una imagen para el producto.');
    if (!name || !price) return alert('El nombre y el precio son obligatorios.');

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
      const filePath = `catalog/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      const productData = {
        name,
        description,
        price: Number(price),
        category,
        image_url: publicUrl,
      };

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!response.ok) throw new Error('Error en el servidor');

      alert('✨ ¡Producto publicado con éxito!');
      
      // Limpiar formulario
      setName('');
      setDescription('');
      setPrice('');
      setCategory('PISOS');
      setFile(null);
      setPreview(null);

    } catch (error) {
      console.error('Error al subir:', error);
      alert('Hubo un error al crear el producto. Intenta de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2 className="admin-title">Panel de Control</h2>
        <p className="admin-subtitle">Agrega un nuevo producto al catálogo de Revestimento</p>

        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Nombre del Producto</label>
            <input 
              type="text" 
              className="custom-input"
              placeholder="Ej. Piso Cerámico tipo Madera"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea 
              className="custom-input"
              placeholder="Breve descripción del material, textura o uso..."
              rows={3}
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Precio ($)</label>
              <input 
                type="number" 
                className="custom-input"
                placeholder="0.00"
                value={price} 
                onChange={(e) => setPrice(Number(e.target.value))} 
                required 
              />
            </div>

            <div className="form-group" style={{ flex: 1 }}>
              <label>Categoría</label>
              <select 
                className="custom-input"
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="PISOS">Pisos</option>
                <option value="AZULEJOS">Azulejos</option>
                <option value="DECORATIVOS">Decorativos</option>
                <option value="MONOMANDOS">Monomandos</option>
                <option value="MEZCLADORAS">Mezcladoras</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Fotografía del Producto</label>
            <div className="file-drop-area">
              <span style={{ color: '#0a2a5e', fontWeight: 600 }}>
                {file ? file.name : 'Haz clic o arrastra una imagen aquí'}
              </span>
              <input 
                type="file" 
                className="file-input-hidden"
                accept="image/*" 
                onChange={handleFileChange} 
              />
            </div>
            
            {/* Si hay una imagen seleccionada, mostramos la vista previa */}
            {preview && (
              <img src={preview} alt="Vista previa" className="image-preview" />
            )}
          </div>
          
          <button type="submit" className="btn-submit" disabled={uploading}>
            {uploading ? (
              <>
                <div className="spinner"></div>
                Subiendo a la nube...
              </>
            ) : (
              'Guardar Producto'
            )}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;