import React from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../types/Product.ts';

const ProductList: React.FC<{ products: Product[] }> = ({ products }) => {
  if (!products.length) return <p>No hay productos.</p>;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductList;
