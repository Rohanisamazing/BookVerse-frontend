// routes/seedRoute.js

// this is used to add dummy books from ./dummyBooks/booksData instantly using the route, instead of manually inserting each book at a time

import express from "express";
import Book from "../models/bookModel.js";
import books from "../dummyBooks/booksData.js";

const router = express.Router();

// @desc Seed books into DB
// @route GET /api/seed/books
router.get("/books", async (req, res) => {
  try {
    await Book.deleteMany(); // Optional: clear DB first
    const createdBooks = await Book.insertMany(books);
    res.status(201).json({
      success: true,
      message: `${createdBooks.length} books seeded`,
      data: createdBooks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to seed books",
      error: error.message,
    });
  }
});

export default router;
