// controllers/bookController.js
import Book from '../models/bookModel.js';

// GET /api/books - Retrieve all books (with pagination)
export const getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const total = await Book.countDocuments();
    const books = await Book.find().skip(skip).limit(limit);

    res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      data: books,
    });
  } catch (error) {
    console.error('❌ Error fetching books:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// GET /api/books/:id - Retrieve a specific book
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.error('❌ Error fetching book by ID:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};


// POST /api/books - Add a new book (admin only)
export const addBook = async (req, res) => {
  try {
    const { title, author, image, genre, rating, description } = req.body;

    if (!title || !author || !image || !genre || !rating || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all fields',
      });
    }

    const newBook = new Book({
      title,
      author,
      image,
      genre,
      rating,
      description,
      reviews: [],
    });

    const savedBook = await newBook.save();

    res.status(201).json({
      success: true,
      message: 'Book added successfully',
      data: savedBook,
    });
  } catch (error) {
    console.error('❌ Error adding book:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
