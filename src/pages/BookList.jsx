import { useEffect, useState } from "react";
import { Search, Filter, Book, Star, Heart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/api";

function BookList() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [favorites, setFavorites] = useState(new Set());
  const [viewMode, setViewMode] = useState("grid");
  const [genres, setGenres] = useState(["All"]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`${BASE_URL}/books`);
        const data = await res.json();
        if (data.success) {
          setBooks(data.data);
          const genreList = ["All", ...new Set(data.data.map(book => book.genre))];
          setGenres(genreList);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.description || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === "All" || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const toggleFavorite = bookId => {
    setFavorites(prev => {
      const newFav = new Set(prev);
      if (newFav.has(bookId)) newFav.delete(bookId);
      else newFav.add(bookId);
      return newFav;
    });
  };

  const renderStars = rating => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 0; i < fullStars; i++) stars.push(
      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    );
    if (hasHalfStar) stars.push(
      <Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />
    );
    const rest = 5 - Math.ceil(rating);
    for (let i = 0; i < rest; i++) stars.push(
      <Star key={`empty-${i}`} className="w-4 h-4 text-gray-400" />
    );
    return stars;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#222831] to-[#393E46] text-[#EEEEEE]">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#00ADB5]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#00ADB5]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div className="relative z-10 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-6 p-3 rounded-full bg-[#393E46]/50 backdrop-blur-sm border border-[#00ADB5]/20">
              <Book className="w-8 h-8 text-[#00ADB5]" />
              <span className="text-[#00ADB5] font-semibold">Digital Library</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-[#EEEEEE] via-[#00ADB5] to-[#EEEEEE] bg-clip-text text-transparent animate-pulse">
              Discover Amazing Books
            </h1>
            <p className="text-lg text-[#EEEEEE]/70 max-w-2xl mx-auto leading-relaxed">
              Explore our curated collection of captivating stories, insightful knowledge, and literary masterpieces
            </p>
            <div className="flex justify-center mt-6">
              <div className="h-1 w-20 bg-gradient-to-r from-transparent via-[#00ADB5] to-transparent rounded-full"></div>
            </div>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#393E46]/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-[#00ADB5]/20 hover:border-[#00ADB5]/40 transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-[#00ADB5] mb-2">{books.length}</div>
              <div className="text-[#EEEEEE]/70">Total Books</div>
            </div>
            <div className="bg-[#393E46]/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-[#00ADB5]/20 hover:border-[#00ADB5]/40 transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-[#00ADB5] mb-2">{genres.length - 1}</div>
              <div className="text-[#EEEEEE]/70">Genres</div>
            </div>
            <div className="bg-[#393E46]/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-[#00ADB5]/20 hover:border-[#00ADB5]/40 transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-[#00ADB5] mb-2">{favorites.size}</div>
              <div className="text-[#EEEEEE]/70">Favorites</div>
            </div>
          </div>
          {/* Search and Filter */}
          <div className="bg-[#393E46]/30 backdrop-blur-sm rounded-2xl p-6 mb-12 border border-[#00ADB5]/20">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#00ADB5]" />
                <input
                  type="text"
                  placeholder="Search by title, author, or description..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#222831] text-[#EEEEEE] placeholder-[#EEEEEE]/50 border border-[#00ADB5]/30 focus:outline-none focus:border-[#00ADB5] focus:ring-2 focus:ring-[#00ADB5]/20 transition-all duration-300"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#00ADB5]" />
                <select
                  value={selectedGenre}
                  onChange={e => setSelectedGenre(e.target.value)}
                  className="pl-12 pr-8 py-4 rounded-xl bg-[#222831] text-[#EEEEEE] border border-[#00ADB5]/30 focus:outline-none focus:border-[#00ADB5] focus:ring-2 focus:ring-[#00ADB5]/20 transition-all duration-300 appearance-none cursor-pointer min-w-[200px]"
                >
                  {genres.map((g, i) => (
                    <option key={i} value={g} className="bg-[#222831]">
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Results Info & View Mode */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-[#EEEEEE]/70">
              {filteredBooks.length > 0 ? (
                <span>
                  Showing <span className="text-[#00ADB5] font-semibold">{filteredBooks.length}</span> books
                </span>
              ) : (
                <span>No books found</span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all duration-300 ${viewMode === "grid" ? "bg-[#00ADB5] text-white" : "bg-[#393E46] text-[#EEEEEE] hover:bg-[#00ADB5]/20"}`}
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
            </div>
          </div>
          {/* Book Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.length > 0 ? (
              filteredBooks.map(book => (
                <div
                  key={book._id}
                  className="group bg-[#393E46]/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#00ADB5]/20 hover:border-[#00ADB5]/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#00ADB5]/20"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#222831]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <button
                      onClick={() => toggleFavorite(book._id)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-[#222831]/80 backdrop-blur-sm border border-[#00ADB5]/30 hover:border-[#00ADB5] transition-all duration-300 hover:scale-110"
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors duration-300 ${favorites.has(book._id) ? "fill-red-500 text-red-500" : "text-[#EEEEEE] hover:text-red-400"}`}
                      />
                    </button>
                    <Link
                      to={`/books/${book._id}`}
                      className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                    >
                      <button className="flex items-center gap-2 px-4 py-2 bg-[#00ADB5] text-white rounded-lg hover:bg-[#00ADB5]/80 transition-colors duration-300">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm font-medium">View Details</span>
                      </button>
                    </Link>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <span className="inline-block bg-gradient-to-r from-[#00ADB5] to-[#00ADB5]/80 text-white text-xs px-3 py-1 rounded-full font-semibold">
                        {book.genre}
                      </span>
                      <span className="text-[#EEEEEE]/60 text-sm">{book.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#EEEEEE] mb-2 group-hover:text-[#00ADB5] transition-colors duration-300">
                      {book.title}
                    </h3>
                    <p className="text-[#EEEEEE]/70 mb-3">by {book.author}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">{renderStars(book.rating)}</div>
                      <span className="text-[#EEEEEE]/60 text-sm">({book.rating})</span>
                    </div>
                    <p className="text-[#EEEEEE]/60 text-sm leading-relaxed mb-4 line-clamp-3">
                      {book.description}
                    </p>
                    <div className="flex justify-between items-center text-sm text-[#EEEEEE]/50">
                      <span>{book.pages || "-"} pages</span>
                      <div className="w-2 h-2 bg-[#00ADB5] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16">
                <div className="w-24 h-24 bg-[#393E46] rounded-full flex items-center justify-center mb-6">
                  <Book className="w-12 h-12 text-[#00ADB5]" />
                </div>
                <h3 className="text-2xl font-bold text-[#EEEEEE] mb-2">No books found</h3>
                <p className="text-[#EEEEEE]/60 text-center max-w-md">
                  Try adjusting your search terms or filters to discover more books in our collection.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookList;
