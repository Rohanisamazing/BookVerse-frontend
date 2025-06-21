import express from 'express';
import { getUserById, updateUserProfile } from '../controllers/userController.js';

const router = express.Router();

// GET user by ID
router.get('/:id', getUserById);

// PUT update user profile
router.put('/:id', updateUserProfile);

export default router;
