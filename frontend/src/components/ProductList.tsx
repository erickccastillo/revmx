import React from 'react';
import type { Product } from '../types/Product';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 0', color: '#666' }}>
        <p>No se encontraron productos con estos filtros.</p>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
      gap: '2rem' 
    }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;