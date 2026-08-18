import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <input
        type="text"
        placeholder="Buscar por nombre (ej. Piso Cerámico)..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          maxWidth: '500px',
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '1rem',
          outline: 'none',
        }}
      />
    </div>
  );
};

export default SearchBar;