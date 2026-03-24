import { Router } from 'express';
import { listStores } from '../controllers/storesController.js';

const router = Router();

router.get('/', listStores);

export default router;
