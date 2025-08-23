import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Award, Leaf } from 'lucide-react';
import Button from '../common/Button';

const CompanyIntro: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-6">
              What we Believe In & What we Stand For ?
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              At Alpico, coffee is more than just a drink, it’s a special part of your day that gives energy, focus, and a little happiness. We think Nepali coffee is amazing, and it should be enjoyed and loved not just in Nepal, but all over the world. Every cup is made with care, showing the hard work of farmers and the skill of roasters.
              <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 font-medium mt-4">
                  For us, it’s not just about selling coffee, it’s about making every cup special.
              </blockquote>

            </p>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Alpico stands for giving people the best coffee experience possible. We want every cup to make you feel proud of Nepali coffee and excited about your day. More than just coffee, we aim to make everyday moments special, connect people, and celebrate the unique flavors and story of Nepal’s coffee.
            </p>

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

            <Link to="/about">
              <Button variant="outline">
                Learn More About Us
              </Button>
            </Link>
          </div>

          <div className="w-full">
            <img
              src="https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Warm, small-batch roasted Nepali coffee beans representing quality and care"
              className="rounded-lg w-full h-auto max-h-[75vh] object-contain shadow-md"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyIntro;