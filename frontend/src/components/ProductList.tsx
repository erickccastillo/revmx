// En tu ProductList.tsx
import React from 'react';
import type { Product } from '../types/Product';

interface ProductListProps {
  products: Product[];
  onProductClick: (product: Product) => void; // <-- 1. Agrega esto a la interfaz
}

const ProductList: React.FC<ProductListProps> = ({ products, onProductClick }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
      {products.map((product) => (
        <div 
          key={product.id} 
          onClick={() => onProductClick(product)} // <-- 2. Llama la función al hacer clic en la tarjeta
          style={{ cursor: 'pointer', /* tus demás estilos de la tarjeta */ }}
        >
          {/* El contenido de tu tarjeta de producto va aquí */}
          <img src={product.image_url} alt={product.name} />
          <h3>{product.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default ProductList;