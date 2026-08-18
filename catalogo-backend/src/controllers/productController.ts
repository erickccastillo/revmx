import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

// Función para obtener productos (Catálogo)
export const getProducts = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ products: data });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

// Función para crear productos (Panel de Administrador)
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, image_url } = req.body;

    const { data, error } = await supabase
      .from('products')
      .insert([{ name, description, price, category, image_url }])
      .select();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params; // Obtenemos el ID de la URL
  const { name, description, price, category, image_url } = req.body;

  try {
    const { data, error } = await supabase
      .from('products')
      .update({ name, description, price, category, image_url })
      .eq('id', id)
      .select();

    if (error) throw error;
    res.status(200).json({ message: 'Producto actualizado con éxito', product: data[0] });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};