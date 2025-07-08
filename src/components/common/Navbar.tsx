import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X,/* Coffee */} from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getCartCount } = useCart();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || !isHomePage 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-2xl font-serif font-bold"
        > 
          {/* <Coffee className={scrolled || !isHomePage ? 'text-navy-900' : 'text-white'} />
          <span className={scrolled || !isHomePage ? 'text-navy-900' : 'text-white'}>
            Alpico
          </span> */}
           {scrolled || !isHomePage?(
            <img src="../images/Coffee_logo.png" alt="Alpico coffee logo" className='flex items-center gap-2 w-30 h-20' />)
            :(
            <img src="../images/Coffee_logo_white.svg" alt="Alpico coffee logo" className='flex items-center gap-2 w-30 h-20' />
            )
          }
        </Link>
   

        <div className="hidden md:flex items-center space-x-8 tracking-widest">
          <Link 
            to="/" 
            className={`${
              scrolled || !isHomePage 
                ? 'text-navy-900 hover:text-blue-700' 
                : 'text-white hover:text-blue-200'
            } transition-colors font-medium`}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className={`${
              scrolled || !isHomePage 
                ? 'text-navy-900 hover:text-blue-700' 
                : 'text-white hover:text-blue-200'
            } transition-colors font-medium`}
          >
            Products
          </Link>
          <Link 
            to="/blog" 
            className={`${
              scrolled || !isHomePage 
                ? 'text-navy-900 hover:text-blue-700' 
                : 'text-white hover:text-blue-200'
            } transition-colors font-medium`}
          >
            Blog
          </Link>
          <Link 
            to="/about" 
            className={`${
              scrolled || !isHomePage 
                ? 'text-navy-900 hover:text-blue-700' 
                : 'text-white hover:text-blue-200'
            } transition-colors font-medium`}
          >
            About Us
          </Link>
          <Link 
            to="/contact" 
            className={`${
              scrolled || !isHomePage 
                ? 'text-navy-900 hover:text-blue-700' 
                : 'text-white hover:text-blue-200'
            } transition-colors font-medium`}
          >
            Contact
          </Link>
          <Link 
            to="/cart" 
            className="relative"
          >
            <ShoppingBag className={scrolled || !isHomePage ? 'text-navy-900' : 'text-white'} />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </Link>
        </div>

        <div className="flex items-center space-x-4 md:hidden">
          <Link 
            to="/cart" 
            className="relative"
          >
            <ShoppingBag className={scrolled || !isHomePage ? 'text-navy-900' : 'text-white'} />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </Link>
          <button 
            onClick={toggleMenu} 
            className={scrolled || !isHomePage ? 'text-navy-900' : 'text-white'}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <div 
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white shadow-lg">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-navy-900 hover:text-blue-700 py-2 border-b border-gray-200 font-medium"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-navy-900 hover:text-blue-700 py-2 border-b border-gray-200 font-medium"
            >
              Products
            </Link>
            <Link 
              to="/blog" 
              className="text-navy-900 hover:text-blue-700 py-2 border-b border-gray-200 font-medium"
            >
              Blog
            </Link>
            <Link 
              to="/about" 
              className="text-navy-900 hover:text-blue-700 py-2 border-b border-gray-200 font-medium"
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="text-navy-900 hover:text-blue-700 py-2 font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;