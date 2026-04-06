import { Router } from 'express';
import {
  createTriedBeer,
  deleteTriedBeer,
  listTriedBeers,
  updateTriedBeer
} from '../controllers/triedBeersController.js';

const router = Router();

router.get('/', listTriedBeers);
router.post('/', createTriedBeer);
router.put('/:triedId', updateTriedBeer);
router.delete('/:triedId', deleteTriedBeer);

export default router;
