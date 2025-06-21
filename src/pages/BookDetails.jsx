import React, { useRef, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BASE_URL } from '../utils/api';

function BookDetails() {
  const { id } = useParams();
  const reviewsRef = useRef(null);

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch book and reviews
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch book details
        const resBook = await fetch(`${BASE_URL}/books/${id}`);
        const bookData = await resBook.json();
        if (!bookData.success) {
          throw new Error(bookData.message || 'Failed to load book');
        }
        setBook(bookData.data);

        // Fetch reviews
        const resRev = await fetch(`${BASE_URL}/reviews?bookId=${id}`);
        const revData = await resRev.json();
        if (!revData.success) {
          throw new Error(revData.message || 'Failed to load reviews');
        }
        setReviews(revData.data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleShowReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) return <div className="text-[#EEEEEE] p-8 text-center">Loading...</div>;
  if (error) return <div className="text-red-500 p-8 text-center">{error}</div>;
  if (!book) return <div className="text-[#EEEEEE] p-8 text-center">Book not found.</div>;

  return (
    <div className="min-h-screen bg-[#222831] py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Book Details Card */}
        <div className="bg-[#EEEEEE] rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden border border-[#00ADB5]/30">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00ADB5]/10 via-[#393E46]/5 to-[#00ADB5]/10 animate-pulse z-0" />

          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-start">
            {/* Image */}
            <div className="rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-105">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-[500px] object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-between min-h-[500px]">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-[#222831] to-[#393E46] text-transparent bg-clip-text mb-2">
                  {book.title}
                </h1>
                <p className="text-[#393E46] text-lg mb-2">
                  by{' '}
                  <span className="text-[#00ADB5] font-semibold">{book.author}</span>
                </p>
                <span className="inline-block text-sm font-semibold text-white bg-gradient-to-r from-[#00ADB5] to-[#393E46] px-4 py-1 rounded-full mb-6 shadow-md">
                  {book.genre}
                </span>

                <div className="flex items-center gap-3 bg-gradient-to-r from-[#00ADB5]/10 to-[#393E46]/10 p-4 rounded-xl border border-[#00ADB5]/20 mb-6">
                  <span className="text-yellow-400 text-2xl animate-pulse">★</span>
                  <span className="font-bold text-lg text-[#222831]">{book.rating}</span>
                  <span className="text-sm text-[#393E46]">({reviews.length} reviews)</span>
                </div>

                <p className="text-[#393E46] leading-7 text-base bg-[#00ADB5]/5 border border-[#00ADB5]/10 p-5 rounded-xl text-justify">
                  {book.description}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <Link to={`/books/${id}/review`}>  
                  <button className="w-full mt-4 self-start px-8 py-3 bg-gradient-to-r from-[#00ADB5] to-[#393E46] text-white font-semibold rounded-xl shadow-md transition-transform hover:scale-105 relative overflow-hidden">
                    <span className="relative z-10">Write a Review</span>
                    <span className="absolute inset-0 bg-white opacity-10 hover:opacity-20 transition-all duration-300" />
                  </button>
                </Link>
                <button
                  onClick={handleShowReviews}
                  className="w-full mt-4 self-start px-8 py-3 bg-gradient-to-r from-[#00ADB5] to-[#393E46] text-white font-semibold rounded-xl shadow-md transition-transform hover:scale-105 relative overflow-hidden"
                >
                  <span className="relative z-10">Show Reviews</span>
                  <span className="absolute inset-0 bg-white opacity-10 hover:opacity-20 transition-all duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div ref={reviewsRef} className="bg-[#393E46] border border-[#00ADB5]/20 rounded-3xl shadow-lg p-8 md:p-10">
          <h2 className="text-3xl font-bold text-[#EEEEEE] mb-6 text-center">Reader Reviews</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div key={review._id} className="bg-[#222831] p-6 rounded-xl border border-[#00ADB5]/10 hover:shadow-lg transition duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-yellow-400 text-lg">{'★'.repeat(review.rating)}</div>
                  <div className="text-[#EEEEEE] font-medium">{review.name}</div>
                </div>
                <p className="text-[#EEEEEE] text-sm leading-relaxed opacity-90">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
