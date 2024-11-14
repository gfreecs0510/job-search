import { Request, Response, NextFunction } from 'express';
import Ajv from 'ajv';
import searchSchema from '../schemas/searchSchema';

const ajv = new Ajv();
const validate = ajv.compile(searchSchema);

export async function validateSchema(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const isValid = validate(req.body);
    if (!isValid) {
      res
        .status(400)
        .json({ error: 'Invalid request', details: validate.errors });

      return;
    }
    next();
  } catch (error: unknown) {
    console.error('Caught an error:', error);
    res.status(500).json('Server error');
    return;
  }
}
