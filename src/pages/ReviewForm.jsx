import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../utils/api";

function ReviewForm() {
  const { id: bookId } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment.trim()) {
      toast.error("Please provide both a rating and a comment.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId,
          name: "Rohan Jambhulkar",
          email: "rohan.jambhulkar@email.com",
          rating,
          comment,
        }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Review submitted successfully!");
        setTimeout(() => navigate(-1), 1500);
      } else {
        toast.error(data.message || "Failed to submit review.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#222831] py-12 px-4">
      <ToastContainer position="top-right" hideProgressBar />
      <div className="max-w-3xl mx-auto bg-[#EEEEEE] rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden border border-[#00ADB5]/30">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00ADB5]/10 via-[#393E46]/5 to-[#00ADB5]/10 animate-pulse z-0" />
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#222831] mb-4">
            Share Your <span className="text-[#00ADB5]">Thoughts</span>
          </h2>
          <p className="text-center text-[#393E46] mb-8">
            Help others discover amazing reads by leaving a review
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Star Rating */}
            <div>
              <label className="block text-[#393E46] font-medium mb-2">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    className={`text-2xl transition-transform duration-300 ${
                      rating >= n ? "text-yellow-400 scale-110" : "text-gray-400"
                    } hover:scale-125`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Review Textarea */}
            <div>
              <label className="block text-[#393E46] font-medium mb-2">
                Your Review
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full h-36 p-4 border border-[#00ADB5]/30 rounded-xl bg-white text-[#222831] resize-none focus:outline-none focus:ring-2 focus:ring-[#00ADB5] transition"
                placeholder="What did you think about the book?"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className={`relative inline-block px-8 py-3 bg-gradient-to-r from-[#00ADB5] to-[#393E46] text-[#EEEEEE] font-semibold rounded-xl shadow-md transition-all hover:scale-105 hover:shadow-lg overflow-hidden ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                <span className="relative z-10">
                  {loading ? "Submitting..." : "Submit Review"}
                </span>
                <span className="absolute inset-0 bg-white opacity-10 hover:opacity-20 transition-all duration-300" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReviewForm;
