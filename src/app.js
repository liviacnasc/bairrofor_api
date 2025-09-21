import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import swaggerUI from 'swagger-ui-express'
import { readFile} from 'fs/promises';

const app = express();

const json = JSON.parse(
  await readFile(
    new URL('../swagger-output.json', import.meta.url)
  )
)

app.use(express.json());
app.use(cors());

app.use('/docs', swaggerUI.serve, swaggerUI.setup(json));

app.use('/', router);

export default app;
