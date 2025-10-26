import fs from 'fs';
import path from 'path';
import { pool } from './database.js';

async function runSeed() {
  try {
    const sqlDir = path.join(process.cwd(), 'src/database/sql');
    const files = fs.readdirSync(sqlDir).filter(file => file.startsWith("seed"));

    for (const file of files) {
      const filePath = path.join(sqlDir, file);
      const sql = fs.readFileSync(filePath, 'utf-8');
      console.log(`Executando script: ${file}`);
      await pool.query(sql);
    }

    console.log('A seed foram executadas com sucesso!');
  } catch (err) {
    console.error('Erro ao rodar seed:', err);
  } finally {
    await pool.end();
  }
}

runSeed();