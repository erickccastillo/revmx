// backend/src/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { pool } from './db';

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

app.get('/products', async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const offset = (page - 1) * limit;
    const search = (req.query.search || '').toString().trim();

    // Base SQL y parámetros
    let sql = 'SELECT * FROM products';
    const params: any[] = [];

    // Añadir filtro de búsqueda si existe
    if (search) {
      params.push(`%${search}%`);           // params[0] -> $1
      sql += ' WHERE name ILIKE $1';
    }

    // Añadir orden, límite y offset. Si ya hay $1, los siguientes placeholders deben continuar ($2, $3...)
    const limitPlaceholderIndex = params.length + 1;   // si params.length==1 -> $2
    const offsetPlaceholderIndex = params.length + 2;  // si params.length==1 -> $3

    sql += ` ORDER BY id LIMIT $${limitPlaceholderIndex} OFFSET $${offsetPlaceholderIndex}`;
    params.push(limit, offset);

    console.log('SQL:', sql, 'params:', params);

    const { rows } = await pool.query(sql, params);
    console.log('Resultados de la consulta:', rows);
    res.json({ data: rows, page });
  } catch (err: any) {
    console.error('DB query error', err);
    res.status(500).json({ error: 'DB_ERROR', message: err?.message || 'Error en la base de datos' });
  }
});

const port = Number(process.env.PORT) || 4000;
const server = app.listen(port, () => console.log(`API escuchando en http://localhost:${port}`));

// cerrar pool al terminar el proceso (útil en dev/test)
process.on('SIGINT', async () => {
  console.log('Cerrando servidor y pool...');
  server.close();
  await pool.end();
  process.exit(0);
});
