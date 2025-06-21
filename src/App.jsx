import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookList from './pages/BookList';
import BookDetails from './pages/BookDetails';
import ReviewForm from './pages/ReviewForm';
import UserProfile from './pages/UserProfile';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';
import AddBook from './pages/AddBook'

function App() {
  return (
    <Router>
      <div className="min-h-screen" style={{ backgroundColor: '#222831' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/books/:id/review" element={<ReviewForm />} />
          <Route path="/user/" element={<UserProfile />} />
          <Route path="*" element={<NotFound />} />
          <Route path='/addBook' element={<AddBook />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;