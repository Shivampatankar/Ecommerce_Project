import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { totalItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="CDAC-Mart" className="h-8 w-8" onError={(e) => e.target.style.display = 'none'} />
              <span className="text-2xl font-bold text-blue-600">CDAC-Mart</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">About Us</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact Us</Link>
            {isAuthenticated && (
              <Link to="/products" className="text-gray-700 hover:text-blue-600">Products</Link>
            )}
            
            {isAuthenticated ? (
              <>
                {user?.userRole !== 'ADMIN' && (
                  <>
                    <Link to="/cart" className="text-gray-700 hover:text-blue-600">
                      Cart
                    </Link>
                    <Link to="/orders" className="text-gray-700 hover:text-blue-600">Orders</Link>
                  </>
                )}
                {user?.userRole === 'ADMIN' && (
                  <Link to="/admin" className="text-gray-700 hover:text-blue-600">Admin</Link>
                )}
                <div className="flex items-center space-x-4">
                  <Link to="/profile" className="text-gray-700 hover:text-blue-600">Hi, {user?.name}</Link>
                  <button onClick={handleLogout} className="btn-secondary">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
                <Link to="/signup" className="btn-primary">Sign Up</Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Home</Link>
              <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-blue-600">About Us</Link>
              <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Contact Us</Link>
              {isAuthenticated && (
                <Link to="/products" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Products</Link>
              )}
              
              {isAuthenticated ? (
                <>
                  {user?.userRole !== 'ADMIN' && (
                    <>
                      <Link to="/cart" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                        Cart
                      </Link>
                      <Link to="/orders" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Orders</Link>
                    </>
                  )}
                  <Link to="/profile" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Profile</Link>
                  {user?.userRole === 'ADMIN' && (
                    <Link to="/admin" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Admin</Link>
                  )}
                  <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Login</Link>
                  <Link to="/signup" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;