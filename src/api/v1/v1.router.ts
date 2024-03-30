import { Router } from 'express';
import * as rank from './rank/rank.router';

export const path = '/v1';
export const router = Router();

router.use(rank.path, rank.router);
