import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils/api';

function Home() {
  const [featuredBooks, setFeaturedBooks] = useState([]);

  // Fisher–Yates shuffle
  const shuffleArray = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(`${BASE_URL}/books`);
        const { success, data } = await res.json();
        if (success && data.length) {
          const shuffled = shuffleArray(data);
          setFeaturedBooks(shuffled.slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching featured books:', err);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="bg-[#222831] min-h-screen w-full">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-[#393E46] rounded-3xl p-12 text-center mb-12 relative overflow-hidden">
          <div className="relative z-10">
            <div className="bg-[#00ADB5] w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center text-4xl">
              📚
            </div>
            <h1 className="text-white font-bold leading-tight text-[clamp(2rem,5vw,4rem)] mb-4">
              Welcome to <span className="text-[#00ADB5]">BookVerse</span>
            </h1>
            <p className="text-[#EEEEEE] text-[clamp(1rem,3vw,1.5rem)] mb-8 opacity-90">
              Your portal to discover, rate, and review amazing books
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/books">
                <button className="bg-[#00ADB5] text-white px-6 py-3 rounded-full font-semibold transition hover:bg-[#00bfc8]">
                  Explore Books
                </button>
              </Link>
              <button className="text-[#EEEEEE] px-6 py-3 border-2 border-[#EEEEEE] rounded-full font-semibold transition hover:bg-[#EEEEEE] hover:text-[#393E46]">
                Join Community
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {[{ number: '10K+', label: 'Books Available' }, { number: '50K+', label: 'Active Readers' }, { number: '200K+', label: 'Reviews Written' }].map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#393E46] p-8 rounded-xl text-center transform transition hover:scale-105"
            >
              <div className="text-4xl font-bold text-[#00ADB5] mb-2">{stat.number}</div>
              <div className="text-lg text-[#EEEEEE] font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Featured Books Section */}
        <div className="mb-10">
          <div className="flex justify-between items-center flex-wrap gap-4 mb-8">
            <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-[#EEEEEE]">Featured Books</h2>
            <Link to="/books" className="text-[#00ADB5] text-lg font-semibold underline hover:text-[#00bfc8]">
              View All →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBooks.map((book) => (
              <Link
                key={book._id}
                to={`/books/${book._id}`}
                className="bg-[#393E46] rounded-xl overflow-hidden transition-all hover:scale-[1.01] cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-[250px] object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-[#00ADB5] text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1">
                    ⭐ {book.rating.toFixed(1)}
                  </div>
                </div>

                <div className="p-6">
                  <span className="bg-[#00ADB5] text-white px-3 py-1 rounded-xl text-sm font-medium mb-3 inline-block">
                    {book.genre}
                  </span>
                  <h3 className="text-xl font-bold text-[#EEEEEE] mb-2 leading-snug">{book.title}</h3>
                  <p className="text-[#EEEEEE] opacity-80 text-base mb-4">by {book.author}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="text-center mt-12">
          <div className="bg-[#393E46] p-8 rounded-3xl inline-block max-w-xl w-full">
            <h3 className="text-[clamp(1.5rem,4vw,2rem)] font-bold text-[#EEEEEE] mb-4">
              Ready to Start Your Reading Journey?
            </h3>
            <p className="text-lg text-[#EEEEEE] opacity-80 mb-6">
              Join thousands of book lovers and discover your next favorite read
            </p>
            <Link to="/books">
              <button className="bg-[#00ADB5] text-white px-6 py-3 rounded-full font-semibold transition hover:bg-[#00bfc8]">
                Get Started Today
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
