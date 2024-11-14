// src/config/ElasticClient.ts
import { Client } from '@elastic/elasticsearch';

const JOBS_INDEX = 'jobs';

class ElasticClient {
  private static instance: Client | null = null;

  private constructor() {} // Private constructor to prevent direct instantiation

  static initialize(): Client {
    if (!ElasticClient.instance) {
      ElasticClient.instance = new Client({
        node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
        auth: {
          username: process.env.ELASTICSEARCH_USER || 'elastic',
          password: process.env.ELASTICSEARCH_PASSWORD || 'password',
        },
      });
    }
    return ElasticClient.instance;
  }

  static getClient(): Client {
    if (!ElasticClient.instance) {
      throw new Error(
        'ElasticClient has not been initialized. Call ElasticClient.initialize() first.'
      );
    }
    return ElasticClient.instance;
  }
}

export { JOBS_INDEX, ElasticClient };
