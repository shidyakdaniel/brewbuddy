import { Router } from 'express';
import {
  createBrewery,
  deleteBrewery,
  getBrewery,
  listBreweries,
  updateBrewery
} from '../controllers/breweriesController.js';

const router = Router();

router.get('/', listBreweries);
router.post('/', createBrewery);
router.get('/:breweryId', getBrewery);
router.put('/:breweryId', updateBrewery);
router.delete('/:breweryId', deleteBrewery);

export default router;
