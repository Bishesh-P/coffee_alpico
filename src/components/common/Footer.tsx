import React, { useState } from 'react';
import { supabase } from '../../supabase-client';
import { Link } from 'react-router-dom';
import { Coffee, Instagram, Facebook, Mail, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        const { error } = await supabase.from('Email').insert([{ email }]);
        if (error) throw error;
        setSubscribed(true);
        setEmail('');
        setTimeout(() => {
          setSubscribed(false);
        }, 3000);
      } catch (error) {
        console.error('Error subscribing:', error);
      }
    }
  };

  return (
    <footer className="bg-gradient-to-br from-navy-900 to-navy-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-2xl font-serif font-bold mb-6 group">
              <Coffee className="text-blue-200 group-hover:text-blue-100 transition-colors" />
              <span className="text-white group-hover:text-blue-100 transition-colors">Alpico Coffee</span>
            </Link>
            <p className="text-blue-100 mb-6 leading-relaxed">
            Alpico sources quality Nepali beans, roasts them and delivers fresh premium coffee to customers and business. We source and roast the finest beans from high altitude in Nepal.
            </p>
            <div className="flex space-x-6">
              <a href="https://www.instagram.com/alpicocoffee/" className="text-blue-200 hover:text-white transition-colors transform hover:scale-110">
                <Instagram size={24} />
              </a>
              <a href="https://www.facebook.com/p/Alpico-Coffee-61568604861071/" className="text-blue-200 hover:text-white transition-colors transform hover:scale-110">
                <Facebook size={24} />
              </a>
              <a href="https://www.linkedin.com/company/alpico-coffee/" className="text-blue-200 hover:text-white transition-colors transform hover:scale-110">
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white font-bold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-blue-100 hover:text-white transition-colors inline-block hover:translate-x-2 transform">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-blue-100 hover:text-white transition-colors inline-block hover:translate-x-2 transform">
                  Shop Coffee
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-blue-100 hover:text-white transition-colors inline-block hover:translate-x-2 transform">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-100 hover:text-white transition-colors inline-block hover:translate-x-2 transform">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-white font-bold mb-6 text-lg">Contact Us</h3>
            <address className="not-italic text-blue-100 space-y-4">
              <p className="flex items-center hover:text-white transition-colors">
                Madhyapur Thimi
              </p>
              <p className="flex items-center hover:text-white transition-colors">
                Bhaktapur - 44800, Nepal
              </p>
              <p className="flex items-center hover:text-white transition-colors">
                alpicocoffeecompany@gmail.com
              </p>
              <p className="flex items-center hover:text-white transition-colors">
                (+977) 986-9062187
              </p>
            </address>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-white font-bold mb-6 text-lg">Weekly Newsletter</h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Subscribe for <span className="font-bold">exclusive offers</span>, free gifts, and brewing tips .
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-l text-navy-900 w-full focus:outline-none bg-white placeholder-slate-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-r text-white transition-colors flex items-center"
                >
                  <Mail size={20} />
                </button>
              </div>
              {subscribed && (
                <p className="text-green-400 text-sm animate-fade-up">Thanks for subscribing!</p>
              )}
            </form>
          </div>
        </div>

        <div className="border-t border-navy-600 mt-12 pt-8 text-center text-blue-100">
          <p>&copy; {new Date().getFullYear()} Alpico Coffee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;