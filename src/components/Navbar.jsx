import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold">RecipeApp</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="block sm:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900">Home</Link>
              {currentUser ? (
                <>
                  <Link to="/add-recipe" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900">Add Recipe</Link>
                  <Link to="/favorites" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900">Favorite</Link>
                  <span className="px-3 py-2 rounded-md text-sm font-medium text-gray-700">Hello, {currentUser.displayName}</span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-500 hover:bg-blue-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900">Login</Link>
                  <Link to="/signup" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 py-3 space-y-1">
            <Link to="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Home</Link>
            {currentUser ? (
              <>
                <Link to="/add-recipe" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Add Recipe</Link>
                <Link to="/favorites" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Favorite</Link>
                <span className="block px-3 py-2 text-gray-700">Hello, {currentUser.displayName}</span>
                <button
                  onClick={handleLogout}
                  className="block px-3 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Login</Link>
                <Link to="/signup" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
