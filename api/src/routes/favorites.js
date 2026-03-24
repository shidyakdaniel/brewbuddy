import { Router } from 'express';
import { addFavorite } from '../controllers/favoritesController.js';

const router = Router();

router.post('/', addFavorite);

export default router;
