import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary-dark text-light-gray px-4 text-center">
      <h1 className="text-6xl font-bold mb-4 text-accent">404</h1>
      <p className="text-2xl font-semibold mb-6">Oops! Page not found.</p>
      <Link
        to="/"
        className="bg-[#00ADB5] text-white px-6 py-3 rounded-full font-semibold transition hover:bg-[#00bfc8]"
      >
        Go Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
