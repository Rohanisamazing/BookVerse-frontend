import express from 'express';
import { getAllBooks, getBookById, addBook } from '../controllers/bookController.js';


const router = express.Router();

router.get('/', getAllBooks);          // /api/books
router.get('/:id', getBookById);
router.post('/', addBook); // ⚠️ We'll add admin auth here later       // /api/books/:id

export default router;
