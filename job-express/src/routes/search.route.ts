import { Router } from 'express';
import { search } from '../controllers/search.controller';
import { validateSchema } from '../middleware/ajv.middleware';
import { rateLimiter } from '../middleware/rateLimiter.middleware';

const router = Router();

router.post('/', rateLimiter, validateSchema, search);

export default router;
