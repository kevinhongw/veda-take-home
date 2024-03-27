import express, { Request, Response } from 'express';
import { healthCheck } from './health-check';

const router = express.Router();

/* GET users listing. */
router.get('/health', healthCheck);

export default router;
