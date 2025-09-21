import { Pool } from 'pg';
import { config } from 'dotenv';

config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
pool.on('connect', () => {
  console.log('Base de Dados conectado com sucesso!');
});

export const query = (text, params) => pool.query(text, params)