import { Router } from 'express';
import { addFavorite, deleteFavorite, listFavorites } from '../controllers/favoritesController.js';

const router = Router();

router.get('/', listFavorites);
router.post('/', addFavorite);
router.delete('/:favoriteId', deleteFavorite);

export default router;
