import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Award, Leaf, Heart, Users, Star } from 'lucide-react';
import Button from '../common/Button';

const CompanyIntro: React.FC = () => {
  return (
    <>
      {/* What We Believe In Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-6">
                What We Believe In
              </h2>
              <div className="text-gray-700 mb-6 leading-relaxed">
                <p className="mb-4">
                  At Alpico, coffee is more than just a drink, it's a special part of your day that gives energy, focus, and a little happiness. We think Nepali coffee is amazing, and it should be enjoyed and loved not just in Nepal, but all over the world. Every cup is made with care, showing the hard work of farmers and the skill of roasters.
                </p>
                <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 font-medium">
                    For us, it's not just about selling coffee, it's about making every cup special.
                </blockquote>
              </div>

              {/* Mobile-first image placed between text and feature icons */}
              <div className="lg:hidden w-full mb-8">
                <img
                  src="https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Premium coffee beans showcasing our commitment to quality and excellence"
                  className="rounded-lg w-full h-auto max-h-[65vh] object-contain shadow-md"
                  loading="lazy"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-3">
                    <Coffee className="text-navy-700" size={24} />
                  </div>
                  <h3 className="font-bold text-navy-900">Small Batch Roasted</h3>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-3">
                    <Award className="text-navy-700" size={24} />
                  </div>
                  <h3 className="font-bold text-navy-900">High Quality</h3>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-3">
                    <Leaf className="text-navy-700" size={24} />
                  </div>
                  <h3 className="font-bold text-navy-900">Sustainably Sourced</h3>
                </div>
              </div>
            </div>

            {/* Desktop/tablet image on the right; hidden on mobile to avoid duplicate display */}
            <div className="w-full hidden lg:block">
              <img
                src="https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Premium coffee beans showcasing our commitment to quality and excellence"
                className="rounded-lg w-full h-auto max-h-[75vh] object-contain shadow-md"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Stand For Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-6">
                What We Stand For
              </h2>
              
              <p className="text-gray-700 leading-relaxed mb-8">
                Alpico stands for giving people the best coffee experience possible. We want every cup to make you feel proud of Nepali coffee and excited about your day. More than just coffee, we aim to make everyday moments special, connect people, and celebrate the unique flavors and story of Nepal's coffee.
              </p>
              
              {/* Mobile image - positioned between paragraph and value highlights */}
              <div className="lg:hidden w-full mb-8">
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/29745520/pexels-photo-29745520.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Coffee harvest in traditional farming practices showcasing our commitment to quality sourcing"
                    className="rounded-xl w-full h-auto max-h-[65vh] object-contain shadow-xl border-4 border-white"
                    loading="lazy"
                  />
                  {/* Decorative overlay */}
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-20 blur-xl"></div>
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-20 blur-lg"></div>
                </div>
              </div>
              
              {/* Value highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg">
                    <Heart className="text-white" size={16} />
                  </div>
                  <span className="text-sm font-medium text-navy-700">Authentic</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg">
                    <Users className="text-white" size={16} />
                  </div>
                  <span className="text-sm font-medium text-navy-700">Connection</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg">
                    <Star className="text-white" size={16} />
                  </div>
                  <span className="text-sm font-medium text-navy-700">Quality</span>
                </div>
              </div>

              <Link to="/about">
                <Button variant="outline" className="hover:bg-blue-600 hover:text-white transition-colors duration-300">
                  Learn More About Us
                </Button>
              </Link>
            </div>

            {/* Desktop/tablet image - hidden on mobile to avoid duplicate display */}
            <div className="w-full lg:order-1 hidden lg:block">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/29745520/pexels-photo-29745520.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Coffee harvest in traditional farming practices showcasing our commitment to quality sourcing"
                  className="rounded-xl w-full h-auto max-h-[75vh] object-contain shadow-xl border-4 border-white"
                  loading="lazy"
                />
                {/* Decorative overlay */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-20 blur-xl"></div>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-20 blur-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CompanyIntro;
