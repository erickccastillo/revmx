export type Product = {
  id: number;             // en la DB es número
  name: string;
  description?: string;
  price: string;          // Postgres devuelve numeric como string
  image?: string;
  stock?: number;
  created_at?: string;    // fechas como string ISO
  updated_at?: string;
};
