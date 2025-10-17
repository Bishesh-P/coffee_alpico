import { memo, useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Navbar = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getCartCount } = useCart();
  const location = useLocation();

  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const cartCount = useMemo(() => getCartCount(), [getCartCount]);
  const isHomePage = useMemo(() => location.pathname === '/', [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  const navTextClass = useMemo(() => 
    scrolled || !isHomePage 
      ? 'text-navy-900 hover:text-blue-700' 
      : 'text-white hover:text-blue-200',
    [scrolled, isHomePage]
  );

  const logoSrc = useMemo(() => 
    scrolled || !isHomePage 
      ? "/images/Coffee_logo.png" 
      : "/images/Coffee_logo_white.svg",
    [scrolled, isHomePage]
  );

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
          <img 
            src={logoSrc} 
            alt="Alpico coffee logo" 
            className='flex items-center gap-2 w-30 h-20' 
          />
        </Link>
   
        <div className="hidden md:flex items-center space-x-8 tracking-widest">
          <Link 
            to="/" 
            className={`${navTextClass} transition-all duration-300 font-medium hover:transform hover:scale-110 hover:translate-y-[-2px] hover-bounce`}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className={`${navTextClass} transition-all duration-300 font-medium hover:transform hover:scale-110 hover:translate-y-[-2px] hover-bounce`}
          >
            Products
          </Link>
          <Link 
            to="/blog" 
            className={`${navTextClass} transition-all duration-300 font-medium hover:transform hover:scale-110 hover:translate-y-[-2px] hover-bounce`}
          >
            Blog
          </Link>
          <Link 
            to="/about" 
            className={`${navTextClass} transition-all duration-300 font-medium hover:transform hover:scale-110 hover:translate-y-[-2px] hover-bounce`}
          >
            About Us
          </Link>
          <Link 
            to="/contact" 
            className={`${navTextClass} transition-all duration-300 font-medium hover:transform hover:scale-110 hover:translate-y-[-2px] hover-bounce`}
          >
            Contact
          </Link>
          <Link 
            to="/cart" 
            className="relative group"
          >
            <ShoppingBag className={`${navTextClass} group-hover:text-blue-700 transition-all duration-300 hover:transform hover:scale-110 hover:translate-y-[-2px] animate-float`} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        <div className="flex items-center space-x-4 md:hidden">
          <Link 
            to="/cart" 
            className="relative group"
          >
            <ShoppingBag className={`${navTextClass} group-hover:text-blue-700 transition-all duration-300 hover:transform hover:scale-110 hover:translate-y-[-2px] animate-float`} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>
          <button 
            onClick={toggleMenu} 
            className={navTextClass}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <div 
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white bg-opacity-95 shadow-lg backdrop-blur-sm">
          <div className="container mx-auto px-4 py-3">
            {/* Main Navigation */}
            <div className="flex flex-col space-y-3 mb-4">
              <Link 
                to="/" 
                className="text-navy-900 hover:text-blue-700 py-2 border-b border-gray-200 font-medium transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-navy-900 hover:text-blue-700 py-2 border-b border-gray-200 font-medium transition-colors"
              >
                Products
              </Link>
              <Link 
                to="/blog" 
                className="text-navy-900 hover:text-blue-700 py-2 border-b border-gray-200 font-medium transition-colors"
              >
                Blog
              </Link>
              <Link 
                to="/about" 
                className="text-navy-900 hover:text-blue-700 py-2 border-b border-gray-200 font-medium transition-colors"
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="text-navy-900 hover:text-blue-700 py-2 border-b border-gray-200 font-medium transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
