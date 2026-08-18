

import React from 'react';
import type { Product } from '../types/Product';




interface ProductCardProps {
  product: Product;
}




const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div style={{ 
      border: '1px solid #eaeaea', 
      borderRadius: '12px', 
      overflow: 'hidden',
      backgroundColor: '#fff',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
    }}>
      <img 
        src={product.image_url} 
        alt={product.name} 
        style={{ width: '100%', height: '220px', objectFit: 'cover' }}
      />
      <div style={{ padding: '1.25rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0a2a5e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {product.category}
        </span>
        <h4 style={{ margin: '0.5rem 0', fontSize: '1.1rem', color: '#333' }}>
          {product.name}
        </h4>
         <p>
          <strong>Descripcion:</strong> {product.description}
        </p>
        <p>
          <strong>Color:</strong> {product.color}
        </p>
        <p>
          <strong>Material:</strong> {product.material}
        </p>
        <p>
          <strong>Medidas:</strong> {product.medidas}
        </p>
        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0a2a5e' }}>
          ${product.price.toLocaleString('es-MX')}
        </div>
      </div>
    </div>
  );
};




export default ProductCard;

