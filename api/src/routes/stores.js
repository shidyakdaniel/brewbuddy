import { Router } from 'express';
import { createStore, deleteStore, getStore, listStores, updateStore } from '../controllers/storesController.js';

const router = Router();

router.get('/', listStores);
router.post('/', createStore);
router.get('/:storeId', getStore);
router.put('/:storeId', updateStore);
router.delete('/:storeId', deleteStore);

export default router;
