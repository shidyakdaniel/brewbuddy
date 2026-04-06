import { Router } from 'express';
import {
  createBeer,
  deleteBeer,
  getBeerById,
  listBeers,
  updateBeer
} from '../controllers/beersController.js';

const router = Router();

router.get('/', listBeers);
router.post('/', createBeer);
router.get('/:beerId', getBeerById);
router.put('/:beerId', updateBeer);
router.delete('/:beerId', deleteBeer);

export default router;
