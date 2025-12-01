import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import swaggerUI from 'swagger-ui-express'
import { readFile} from 'fs/promises';
import { AppError } from './helpers/responses.js';

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

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Erro interno'
    });
});

export default app;
