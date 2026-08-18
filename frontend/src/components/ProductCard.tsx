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
        style={{ width: '100%', height: 'fontWeight: 600, color: '#0a2a5e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {product.category}
        </span>

        <h4 style={{ margin: '0.5rem 0', fontSize: '1.1rem', color: '#333' }}>
          {product.name}
        </h4>

        <p
          style={{
            color: '#666',
            fontSize: '0.9rem',
            marginBottom: '1rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.description}
        </p>

        {product.color && (
          <p style={{ color: '#666', fontSize: '0.9rem', margin: '0.25rem 0' }}>
            <strong>Color:</strong> {product.color}
          </p>
        )}

        {product.material && (
          <p style={{ color: '#666', fontSize: '0.9rem', margin: '0.25rem 0' }}>
            <strong>Material:</strong> {product.material}
          </p>
        )}

        {product.medidas && (
          <p style={{ color: '#666', fontSize: '0.9rem', margin: '0.25rem 0 1rem 0' }}>
            <strong>Medidas:</strong> {product.medidas}
          </p>
        )}

        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0a2a5e' }}>
          ${product.price.toLocaleString('es-MX')}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
