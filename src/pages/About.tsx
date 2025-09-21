import React from 'react';
import { Coffee, Leaf, Globe, Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';
import { seoConfig } from '../config/seo';
import { organizationSchema, generateBreadcrumbSchema } from '../utils/structuredData';

const About: React.FC = () => {
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/about' }
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, breadcrumbSchema]
  };

  // Testimonials shown in the "What Our Customers Say" section
  const testimonials = [
    {
      quote:
        "Alpico's coffee is absolutely incredible! The floral notes and bright acidity make every morning special. Knowing it's sustainably sourced makes it even better.",
      author: 'Priya S.',
      location: 'Mumbai',
      rating: 5,
    },
    {
      quote:
        'Balanced, sweet, and super fresh. Their medium roast has become my daily go-to—works great for both pour-over and moka pot.',
      author: 'Arjun K.',
      location: 'Kathmandu',
      rating: 5,
    },
    {
      quote:
        'I appreciate the transparency about origins and process. You can taste the care from farm to cup. Fast delivery too!',
      author: 'Maya R.',
      location: 'Pune',
      rating: 4,
    },
    {
      quote:
        'Fantastic crema for espresso and a smooth finish. Customer support helped me pick the right grind perfect experience.',
      author: 'Sanjay T.',
      location: 'Delhi',
      rating: 5,
    },
    {
      quote:
        'The aroma is next level. Their freshness promise is real—beans arrived just two days after roasting.',
      author: 'Nisha P.',
      location: 'Bengaluru',
      rating: 5,
    },
    {
      quote:
        'Great value for specialty quality. The notes of chocolate and citrus are consistent across bags very impressed.',
      author: 'Ravi S.',
      location: 'Hyderabad',
      rating: 4,
    },
  ];

  // Slider state for testimonials
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);
  const totalTestimonials = testimonials.length;
  const goNext = React.useCallback(() => {
    setCurrentTestimonial((i) => (i + 1) % totalTestimonials);
  }, [totalTestimonials]);

  const goPrev = React.useCallback(() => {
    setCurrentTestimonial((i) => (i - 1 + totalTestimonials) % totalTestimonials);
  }, [totalTestimonials]);

  return (
    <div className="pt-20 md:pt-16">
      <SEOHead
        title={seoConfig.pages.about.title}
        description={seoConfig.pages.about.description}
        keywords={seoConfig.pages.about.keywords}
        url="/about"
        structuredData={combinedSchema}
      />
      
      {/* Hero Section */}
      <div 
        className="relative py-24 md:py-32 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/585750/pexels-photo-585750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
            Our Story
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto tracking-wide">
            From the farms to your cup, you need to know how Alpico Coffee is defining coffee in Nepal and beyond.
          </p>
        </div>
      </div>

      {/* Our Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-navy-900 mb-6">
              Our Mission - Best Coffee in Nepal
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed tracking-wide">
              At Alpico Coffee, we believe that coffee is more than just a beverage, it's an experience that connects people across cultures and continents. Our mission is to source the finest Arabica coffee beans from Nepal's finest regions, roast them with precision for best taste possible, and deliver an exceptional cup that honors the hard work of local coffee farmers to Nepal and the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.pexels.com/photos/2159146/pexels-photo-2159146.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Coffee farmers" 
                className="rounded-lg shadow-md"
              />
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-navy-900 mb-4 tracking-wide">
                Our Values
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <Coffee className="text-navy-700" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-800 mb-1 tracking-wide">Quality Above All</h4>
                    <p className="text-gray-700 tracking-wide">
                      We carefully select each bean and perfect our roasting process to bring out the most distinctive flavors in every batch.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <Leaf className="text-navy-700" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-800 mb-1 tracking-wide">Sustainability</h4>
                    <p className="text-gray-700 tracking-wide">
                      We're committed to environmentally responsible practices throughout our supply chain, from farm to cup.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4">
                    <Globe className="text-navy-700" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-800 mb-1 tracking-wide">Community</h4>
                    <p className="text-gray-700 tracking-wide">
                      We build lasting relationships with our farmers, paying fair prices and investing in their communities. 
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story - The Alpico Journey */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-navy-900 mb-8 text-center">
              The Alpico Story
            </h2>
            
            {/* Origin Story */}
            <div className="mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-navy-900 mb-4">
                    How Our Dream Started
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Alpico Coffee began with a big dream: to show the world how amazing Nepal's coffee really is! We wanted to help the farmers who work so hard to grow these special coffee beans. What started as our love for great coffee became our mission to make Nepal famous for its delicious coffee.
                  </p>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    We fell in love with Nepal's coffee because it tastes so different and wonderful. It grows high up in the mountains near the Himalayas, which makes it taste like flowers and sunshine. We knew that people all around the world would love this special coffee if they could try it.
                  </p>
                </div>
                <div>
                  <img 
                    src="https://images.pexels.com/photos/4629633/pexels-photo-4629633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Coffee farmer in Nepal mountains" 
                    className="rounded-lg shadow-md w-11/12 md:w-10/12 mx-auto max-h-72 sm:max-h-80 lg:max-h-96"
                  />
                </div>
              </div>
            </div>

            {/* The Vision */}
            <div className="mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="lg:order-2">
                  <h3 className="text-2xl font-serif font-bold text-navy-900 mb-4">
                    Our Big Dream Comes True
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    In 2024, we started Alpico Coffee with just our determination and love for great coffee. We chose the name <strong>"Alpico"</strong> because <strong>"Alp"</strong>
                     reminds us of the tall mountains where our coffee grows, and <strong>"ico"</strong> means <strong>iconic</strong> we want to make coffee that everyone will remember and love.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Our dream was simple but powerful: we wanted to connect the amazing farmers in Nepal with coffee lovers everywhere. We promised to pay farmers fairly for their hard work and make sure every cup of coffee tells the beautiful story of where it came from.
                  </p>
                </div>
                <div className="lg:order-1">
                  <img 
                    src="https://images.pexels.com/photos/4886268/pexels-photo-4886268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Coffee roasting process" 
                    className="rounded-lg shadow-md w-full"
                  />
                </div>
              </div>
            </div>

            {/* The Challenges and Growth */}
            <div className="mb-16">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-serif font-bold text-navy-900 mb-6 text-center">
                  Building Something Beautiful
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-bold text-blue-800 mb-3">The Early Days</h4>
                    <p className="text-gray-700 leading-relaxed">
                      We started without any equipment, only determination and countless hours spent searching for the best coffee. Along the way, we met many people who had been working with coffee in regions like Kavre, Sindhupalchowk, and Gulmi. These connections grew into strong relationships, which later became the foundation of our supply chain.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-blue-800 mb-3">Learning and Growing</h4>
                    <p className="text-gray-700 leading-relaxed">
                      We learned that great coffee isn't just about the final product – it's about the entire process. From understanding soil conditions to mastering roasting techniques, from packaging that preserves freshness to building relationships with customers who share our vision. Every challenge taught us something valuable.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Philosophy */}
            <div className="mb-16">
              <div className="text-center">
                <h3 className="text-2xl font-serif font-bold text-navy-900 mb-6">
                  What Drives Us Every Day
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Coffee className="text-navy-700" size={24} />
                    </div>
                    <h4 className="font-bold text-navy-900 mb-3">Craft & Quality</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Every bean is selected with care, every roast perfected with precision. We believe that exceptional coffee is an art form that deserves respect and dedication.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Heart className="text-navy-700" size={24} />
                    </div>
                    <h4 className="font-bold text-navy-900 mb-3">People First</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      From our farming partners to our customers, we believe in building genuine relationships based on trust, respect, and shared passion for exceptional coffee.
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Globe className="text-navy-700" size={24} />
                    </div>
                    <h4 className="font-bold text-navy-900 mb-3">Global Vision</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      We dream of putting Nepal on the world coffee map, showcasing the incredible potential of Himalayan coffee to coffee lovers everywhere.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Love & Community Impact */}
      <section className="py-16 bg-navy-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-12">
            Our Impact & Community
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="mb-4 inline-flex justify-center items-center w-16 h-16 bg-blue-800 rounded-full">
                <Coffee className="text-blue-200" size={32} />
              </div>
              <h3 className="font-bold text-xl mb-2">500+</h3>
              <p className="text-blue-200">Happy Customers</p>
            </div>
            <div>
              <div className="mb-4 inline-flex justify-center items-center w-16 h-16 bg-blue-800 rounded-full">
                <Globe className="text-blue-200" size={32} />
              </div>
              <h3 className="font-bold text-xl mb-2">5+</h3>
              <p className="text-blue-200">Farming Communities</p>
            </div>
            <div>
              <div className="mb-4 inline-flex justify-center items-center w-16 h-16 bg-blue-800 rounded-full">
                <Star className="text-blue-200" size={32} />
              </div>
              <h3 className="font-bold text-xl mb-2">4.7/5</h3>
              <p className="text-blue-200">Average Customer Rating</p>
            </div>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-6 text-white text-center">What Our Customers Say</h3>
            <div className="relative">
              <div className="bg-blue-800/90 p-6 md:p-8 rounded-xl shadow-lg border border-blue-700/40">
                <p className="text-blue-100 italic mb-4 md:mb-6 tracking-wide text-center">"{testimonials[currentTestimonial].quote}"</p>
                <p className="text-blue-200 font-medium text-center">- {testimonials[currentTestimonial].author}, {testimonials[currentTestimonial].location}</p>
              </div>
              {/* Arrows */}
              <button
                onClick={goPrev}
                aria-label="Previous testimonial"
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-8 w-9 h-9 md:w-10 md:h-10 rounded-full bg-blue-900/70 hover:bg-blue-900 text-blue-100 flex items-center justify-center shadow"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                aria-label="Next testimonial"
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-8 w-9 h-9 md:w-10 md:h-10 rounded-full bg-blue-900/70 hover:bg-blue-900 text-blue-100 flex items-center justify-center shadow"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="flex items-center justify-center mt-6">
                <div className="text-blue-200 text-sm">
                  {currentTestimonial + 1} / {totalTestimonials}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;