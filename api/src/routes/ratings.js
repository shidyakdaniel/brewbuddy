import { Router } from 'express';
import {
  createRating,
  deleteRating,
  getRating,
  listRatings,
  updateRating
} from '../controllers/ratingsController.js';

const router = Router();

router.get('/', listRatings);
router.post('/', createRating);
router.get('/:ratingId', getRating);
router.put('/:ratingId', updateRating);
router.delete('/:ratingId', deleteRating);

export default router;
