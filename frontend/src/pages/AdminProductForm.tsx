import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useParams, useNavigate } from 'react-router-dom';
import './AdminProductForm.css';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const AdminProductForm: React.FC = () => {
  const { id } = useParams(); // Detecta si hay un ID en la URL para editar
  const navigate = useNavigate();
  const isEditing = Boolean(id); // Si hay ID, estamos editando

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [category, setCategory] = useState('PISOS');
  
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loadingData, setLoadingData] = useState(isEditing); // Estado para cuando cargamos datos a editar

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  // EFECTO: Si estamos editando, traemos los datos del producto al abrir la página
  useEffect(() => {
    if (isEditing) {
      const fetchProduct = async () => {
        try {
          // Asumiendo que tu backend también tiene un GET /api/products/:id
          // Si no lo tiene, conectamos directo a Supabase por ahora para llenar el form:
          const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
          if (error) throw error;

          if (data) {
            setName(data.name);
            setDescription(data.description || '');
            setPrice(data.price);
            setCategory(data.category);
            setPreview(data.image_url);
            setExistingImageUrl(data.image_url);
          }
        } catch (error) {
          console.error("Error al cargar producto:", error);
          alert("No se pudo cargar la información del producto.");
        } finally {
          setLoadingData(false);
        }
      };
      fetchProduct();
    }
  }, [id, isEditing]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Si estamos creando, el archivo es obligatorio. Si estamos editando, es opcional (podemos conservar la imagen vieja).
    if (!isEditing && !file) return alert('Por favor, selecciona una imagen.');
    if (!name || !price) return alert('El nombre y el precio son obligatorios.');

    setUploading(true);
    try {
      let finalImageUrl = existingImageUrl;

      // 1. Si el usuario seleccionó una imagen nueva, la subimos
      if (file) {
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
          
        finalImageUrl = publicUrl;
      }

      // 2. Preparamos los datos
      const productData = {
        name,
        description,
        price: Number(price),
        category,
        image_url: finalImageUrl,
      };

      // 3. Decidimos si mandamos un POST (Crear) o un PUT (Editar)
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing ? `${apiUrl}/api/products/${id}` : `${apiUrl}/api/products`;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!response.ok) throw new Error('Error en el servidor');

      alert(isEditing ? '✨ ¡Producto actualizado!' : '✨ ¡Producto publicado con éxito!');
      
      // Si todo sale bien, lo devolvemos al catálogo
      navigate('/catalog');

    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Hubo un error al guardar el producto. Intenta de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  if (loadingData) return <div style={{textAlign: 'center', marginTop: '5rem'}}>Cargando información...</div>;

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2 className="admin-title">{isEditing ? 'Editar Producto' : 'Panel de Control'}</h2>
        <p className="admin-subtitle">
          {isEditing ? 'Modifica los detalles del producto' : 'Agrega un nuevo producto al catálogo'}
        </p>

        <form onSubmit={handleSubmit}>
          {/* ... Aquí van exactamente los mismos inputs que ya tenías ... */}
          {/* Nombre, Descripción, Precio, Categoría */}
          
          <div className="form-group">
            <label>Nombre del Producto</label>
            <input 
              type="text" 
              className="custom-input"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea 
              className="custom-input"
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
                value={price} 
                onChange={(e) => setPrice(Number(e.target.value))} 
                required 
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Categoría</label>
              <select className="custom-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="PISOS">Pisos</option>
                <option value="AZULEJOS">Azulejos</option>
                <option value="DECORATIVOS">Decorativos</option>
                <option value="MONOMANDOS">Monomandos</option>
                <option value="MEZCLADORAS">Mezcladoras</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>{isEditing ? 'Cambiar Fotografía (Opcional)' : 'Fotografía del Producto'}</label>
            <div className="file-drop-area">
              <span style={{ color: '#0a2a5e', fontWeight: 600 }}>
                {file ? file.name : 'Haz clic o arrastra una imagen aquí'}
              </span>
              <input type="file" className="file-input-hidden" accept="image/*" onChange={handleFileChange} />
            </div>
            {preview && <img src={preview} alt="Vista previa" className="image-preview" />}
          </div>
          
          <button type="submit" className="btn-submit" disabled={uploading}>
            {uploading ? (
              <>{/* Puedes poner tu spinner aquí */} Guardando en la nube...</>
            ) : (
              isEditing ? 'Actualizar Producto' : 'Guardar Producto'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;