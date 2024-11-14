import express from 'express';
import helmet from 'helmet';
import searchRoutes from './routes/search.route';
import { ElasticClient } from './clients/elasticsearch.client';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

async function bootstrap(): Promise<void> {
  ElasticClient.initialize();
}

bootstrap()
  .then(() => {
    app.use(express.json());
    app.use(helmet());
    app.use(helmet.xssFilter());
    app.use('/search', searchRoutes);
    app.listen(port, () => {
      console.log('Express app running in port: ', port);
    });
    throw new Error('test');
  })
  .catch((error: unknown) => {
    console.error('An error occurred:', error);
  });
