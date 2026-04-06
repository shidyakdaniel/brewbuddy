import { Router } from 'express';
import { createProfile, deleteProfile, getProfile, updateProfile } from '../controllers/profilesController.js';

const router = Router();

router.post('/', createProfile);
router.get('/:userId', getProfile);
router.put('/:userId', updateProfile);
router.delete('/:userId', deleteProfile);

export default router;
