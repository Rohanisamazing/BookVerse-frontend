import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../utils/api';

function AddBook() {
  const navigate = useNavigate();

  // 🔐 Simulated logged-in user
  const [user, setUser] = useState(null);

  // 📦 Book state
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    image: '',
    genre: '',
    rating: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Normally you'd fetch user from auth context or localStorage
    const dummyUser = {
      name: 'Rohan Jambhulkar',
      email: 'rohan.jambhulkar@email.com',
      isAdmin: true, // Change to false to test non-admin view
    };
    setUser(dummyUser);
  }, []);

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookData.title || !bookData.author || !bookData.image) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData),
      });
      const result = await res.json();

      if (result.success) {
        toast.success('Book added successfully!');
        setTimeout(() => navigate('/books'), 1500);
      } else {
        toast.error(result.message || 'Failed to add book');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error submitting book');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  if (!user.isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#222831] to-[#393E46] flex flex-col items-center justify-center text-[#EEEEEE] px-4">
        <h2 className="text-2xl font-bold mb-4">Only users with admin permission can add books.</h2>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-[#00ADB5] text-white rounded-lg font-semibold shadow hover:scale-105 transition"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#222831] to-[#393E46] px-6 py-10 text-[#222831]">
      <ToastContainer position="top-right" hideProgressBar />
      <div className="max-w-xl mx-auto bg-[#EEEEEE] rounded-xl p-8 shadow-lg border border-[#00ADB530]">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#222831]">Add New Book (Admin Only)</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {['title', 'author', 'image', 'genre', 'rating', 'description'].map((field, i) => (
            <div key={i}>
              <label className="block mb-1 font-semibold capitalize">{field}</label>
              <input
                type={field === 'rating' ? 'number' : 'text'}
                name={field}
                value={bookData[field]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#00ADB5] text-white py-3 rounded-lg font-semibold hover:scale-105 transition-all shadow-md ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Submitting...' : 'Submit Book'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
