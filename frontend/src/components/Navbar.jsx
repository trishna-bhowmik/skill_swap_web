import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken'); // Check token instead of just "isLoggedIn"
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const isActive = (path) =>
    location.pathname === path
      ? 'text-white border-b-2 border-white'
      : 'text-white/90 hover:text-white';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-700 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold text-white tracking-tight">
          Stack<span className="text-white/80">It</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex space-x-8 text-sm font-medium items-center">
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/skills" className={isActive('/skills')}>Skills</Link>
          <Link to="/peoples" className={isActive('/peoples')}>People</Link>

          {isLoggedIn ? (
            <>
              <Link to="/messages" className={isActive('/messages')}>Messages</Link>
              <Link to="/profile" className={isActive('/profile')}>Profile</Link>
              <button
                onClick={handleLogout}
                className="text-white/80 hover:text-red-300 ml-4"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className={isActive('/signup')}>Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
