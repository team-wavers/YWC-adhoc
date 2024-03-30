import { Router } from 'express';
import RankController from './rank.controller';

export const path = '/rank';
export const router = Router();

router.get('/', new RankController().list);
router.get('/set', new RankController().setRank);
