import { memo } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const Hero = memo(() => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Premium background with multiple layers */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-zoom-pan"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&dpr=2)', 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>

      {/* Premium glass effect overlay */}
      <div className="absolute inset-0 glass-effect opacity-5"></div>

      {/* Main content positioned lower */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-32">
        <div className="max-w-4xl">
          {/* Premium badge */}
          <div className="inline-flex items-center px-4 py-2 mb-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm font-medium animate-fade-down">
            <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
            Premium Nepal Coffee Since 2020
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-premium font-bold text-white mb-6 animate-fade-down leading-tight tracking-tight">
            We Craft the <span className="bg-gradient-to-r from-blue-300 via-blue-200 to-yellow-200 bg-clip-text text-transparent">Finest Coffee</span> in Nepal for You
          </h1>
          
          <p className="text-xl sm:text-2xl text-blue-100/90 mb-10 animate-fade-up delay-200 leading-relaxed max-w-3xl font-light">
            Our mission is to elevate premium Nepali coffee culture, locally and internationally. We're dedicated to supporting artisan farmers and inspiring a new generation in this exceptional craft.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 animate-fade-up delay-300 mb-12">
            <Link to="/products">
              <Button variant="premium" size="xl" className="min-w-[200px]">
                Explore Premium Collection
              </Button>
            </Link>
            <Link to="/about">
              <Button 
                variant="outline" 
                size="xl" 
                className="text-white border-white/50 hover:bg-white/10 backdrop-blur-sm min-w-[200px]"
              >
                Discover Our Heritage
              </Button>
            </Link>
          </div>

          {/* Premium stats */}
          <div className="flex flex-wrap gap-8 animate-fade-up delay-500">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">15+</div>
              <div className="text-blue-200/80 text-sm uppercase tracking-widest">Premium Varieties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-blue-200/80 text-sm uppercase tracking-widest">Arabica Quality</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">50+</div>
              <div className="text-blue-200/80 text-sm uppercase tracking-widest">Partner Farmers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">5★</div>
              <div className="text-blue-200/80 text-sm uppercase tracking-widest">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-8 h-14 rounded-full border-2 border-white/30 flex items-start justify-center backdrop-blur-sm">
          <div className="w-2 h-4 bg-white/70 rounded-full mt-3 animate-pulse"></div>
        </div>
      </div>

      {/* Premium decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-xl animate-float delay-1000 hidden lg:block"></div>
      <div className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-tr from-yellow-400/10 to-transparent rounded-full blur-xl animate-float delay-2000 hidden lg:block"></div>
    </div>
  );
});

Hero.displayName = 'Hero';

export default Hero;
