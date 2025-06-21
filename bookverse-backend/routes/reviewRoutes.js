import express from 'express';
import { createReview, getReviewsByBook } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/', createReview);
router.get('/', getReviewsByBook); 

export default router;
