import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-zoom-pan"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)', 
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
        <div className="max-w-2xl pt-16 md:pt-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 animate-fade-down leading-tight">
            {/* Discover the Art of <span className="text-blue-300">Alpine</span> Coffee
          </h1> */}
          We Make the <span className="text-blue-300">Best Coffee in Nepal</span> for You
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 animate-fade-up delay-200 leading-relaxed">
            Our mission is to promote high-quality coffee from Nepal, locally and internationally. We’re dedicated to supporting local farmers and inspiring youth to be part of this growing industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-300">
            <Link to="/products">
              <Button variant="primary" size="lg">
                Explore Our Coffee
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:bg-opacity-10">
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-8 h-12 rounded-full border-2 border-white flex items-start justify-center">
          <div className="w-1.5 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;