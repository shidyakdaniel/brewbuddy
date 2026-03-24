import { Router } from 'express';
import { createRating } from '../controllers/ratingsController.js';

const router = Router();

router.post('/', createRating);

export default router;
