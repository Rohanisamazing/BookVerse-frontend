import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="relative bg-gradient-to-r from-[#222831] via-[#393E46] to-[#222831] text-[#EEEEEE] shadow-lg border-b border-[#00ADB533] overflow-hidden">
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00ADB519] via-[#00ADB50A] to-[#00ADB519] animate-pulse z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-4">
        <ul className="flex items-center justify-center gap-4 list-none m-0 p-0 flex-wrap">
          {[
            { name: 'Home', path: '/' },
            { name: 'Books', path: '/books' },
            { name: 'Profile', path: '/user' },
            { name: 'Add Book', path: '/addBook'}
          ].map((item, i) => (
            <li key={i}>
              <Link
                to={item.path}
                className="relative inline-block px-6 py-3 text-sm font-semibold uppercase transition-transform duration-300 ease-in-out text-[#EEEEEE] hover:scale-105 hover:text-[#00ADB5] group"
              >
                {/* Glow effect */}
                <span className="absolute inset-0 bg-gradient-to-tr from-[#00ADB533] to-[#00ADB522] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm z-0"></span>

                {/* Underline animation */}
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#00ADB5] to-[#393E46] group-hover:w-full transition-all duration-300 z-10"></span>

                <span className="relative z-10">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom shimmer border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00ADB5] to-transparent opacity-50"></div>
    </nav>
  );
}

export default Navbar;
