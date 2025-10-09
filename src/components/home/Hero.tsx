import { memo } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const Hero = memo(() => {
  return (
    <div className="relative h-screen">
      {/* Optimized LCP image with responsive sources; disable heavy animation on mobile */}
      <div className="absolute inset-0 overflow-hidden md:animate-zoom-pan">
        <picture>
          <source
            media="(max-width: 640px)"
            srcSet="https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=640&h=400&dpr=1"
          />
          <source
            media="(max-width: 1024px)"
            srcSet="https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=1024&h=640&dpr=1"
          />
          <img
            src="https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1"
            alt="Fresh coffee beans and brewing setup"
            className="w-full h-full object-cover"
            decoding="async"
            fetchPriority="high"
          />
        </picture>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-start pt-20">
        <div className="max-w-2xl mt-8">
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
});

Hero.displayName = 'Hero';

export default Hero;