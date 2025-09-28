import fs from 'fs';
import path from 'path';
import { pool } from './database.js';

async function runMigration() {
  try {
    const sqlDir = path.join(process.cwd(), 'src/database/sql');
    const files = fs.readdirSync(sqlDir).filter(file => file.startsWith("migration"));

    for (const file of files) {
      const filePath = path.join(sqlDir, file);
      const sql = fs.readFileSync(filePath, 'utf-8');
      console.log(`Executando script: ${file}`);
      await pool.query(sql);
    }

    console.log('Migration executada com sucesso');
  } catch (err) {
    console.error('Erro ao rodar Migration:', err);
  } finally {
    await pool.end(); // fecha as conexões
  }
}

runMigration();