import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String },
    genre: { type: String },
    rating: { type: Number, default: 0 },
    reviews: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Review",
      default: [],
    },
    description: { type: String },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
