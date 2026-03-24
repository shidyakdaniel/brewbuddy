import { Router } from 'express';
import { getBeerById, listBeers } from '../controllers/beersController.js';

const router = Router();

router.get('/', listBeers);
router.get('/:id', getBeerById);

export default router;
