import { Request, Response } from 'express';

import { knex } from '../database';

export const healthCheck = async (req: Request, res: Response) => {
  console.log('Health check route hit');

  const result = await knex.table('health').select();

  if (result.length < 0) {
    res.status(500).json({
      message: 'Unable get health table result',
    });
  }

  res.json(result[0]);
};
