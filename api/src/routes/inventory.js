import { Router } from 'express';
import { createInventory, deleteInventory, listInventory, updateInventory } from '../controllers/inventoryController.js';

const router = Router();

router.get('/', listInventory);
router.post('/', createInventory);
router.put('/:inventoryId', updateInventory);
router.delete('/:inventoryId', deleteInventory);

export default router;
