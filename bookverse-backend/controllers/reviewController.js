import Review from '../models/reviewModel.js';

// GET /api/reviews?bookId=xxx
export const getReviewsByBook = async (req, res) => {
  try {
    const { bookId } = req.query;

    if (!bookId) {
      return res.status(400).json({ success: false, message: 'bookId is required in query' });
    }

    // Use the correct field name 'book' in schema
    const reviews = await Review.find({ book: bookId });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    console.error('❌ Error fetching reviews:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


export const createReview = async (req, res) => {
  try {
    const { bookId, name, email, rating, comment } = req.body;

    if (!bookId || !name || !email || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newReview = await Review.create({ book: bookId, name, email, rating, comment });

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      data: newReview,
    });
  } catch (error) {
    console.error('❌ Error creating review:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};