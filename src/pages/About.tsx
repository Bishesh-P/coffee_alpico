import React from 'react';
import { /*Award,*/ Coffee, Leaf, Globe, Users, Heart, Star } from 'lucide-react';
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
            From a small roastery to a craft coffee company with a passion for exceptional beans and sustainable practices.
          </p>
        </div>
      </div>

      {/* Our Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-navy-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed tracking-wide">
              At Alpico Coffee, we believe that coffee is more than just a beverage, it's an experience that connects people across cultures and continents. Our mission is to source the finest beans, roast them with precision and care, and deliver an exceptional cup that honors the hard work of farmers and the rich heritage of coffee from the farms of Nepal.
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
                Our Values(What we stand for)
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

      {/* Our Story */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-navy-900 mb-6 text-center">
              Our Journey
            </h2>
            
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                  <div className="bg-white p-6 rounded-lg shadow-md h-full">
                    <h3 className="font-bold text-navy-900 mb-2">2024</h3>
                    <p className="text-gray-700">
                      Alpico began as a small roastery with a single roaster and a passion for quality coffee.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/3">
                  <div className="bg-white p-6 rounded-lg shadow-md h-full">
                    <h3 className="font-bold text-navy-900 mb-2">2025</h3>
                    <p className="text-gray-700">
                      We established direct trade relationships with farmers in Sindhupalchowk, Gulmi and Gorkha, focusing on sustainability and quality.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/3">
                  <div className="bg-white p-6 rounded-lg shadow-md h-full">
                    <h3 className="font-bold text-navy-900 mb-2">2025</h3>
                    <p className="text-gray-700">
                      Today, we export to foreign countries, operating with a commitment to excellence and environmental responsibility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-navy-900 mb-12 text-center">
            Meet Our Team
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 overflow-hidden rounded-full mx-auto w-48 h-48">
                <img 
                  src="https://images.pexels.com/photos/4906334/pexels-photo-4906334.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="James Wilson, Head Roaster" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-navy-900 text-xl mb-1">James Wilson</h3>
              <p className="text-blue-800 mb-3">Head Roaster </p>
              <p className="text-gray-600 max-w-xs mx-auto">
                With 15 years of experience in specialty coffee, James leads our roasting program with passion and precision.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 overflow-hidden rounded-full mx-auto w-48 h-48">
                <img 
                  src="https://images.pexels.com/photos/7242908/pexels-photo-7242908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Elena Martinez, Founder" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-navy-900 text-xl mb-1">Elena Martinez</h3>
              <p className="text-blue-800 mb-3">Founder</p>
              <p className="text-gray-600 max-w-xs mx-auto">
                Elena travels to different parts of Nepal to find the best coffee beans and build relationships with our partner farms.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 overflow-hidden rounded-full mx-auto w-48 h-48">
                <img 
                  src="https://images.pexels.com/photos/8108063/pexels-photo-8108063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="David Chen, Master Blender" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-navy-900 text-xl mb-1">David Chen</h3>
              <p className="text-blue-800 mb-3">Master Blender</p>
              <p className="text-gray-600 max-w-xs mx-auto">
                With an exceptional palate, David creates our signature blends and ensures consistent quality.
              </p>
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
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4 inline-flex justify-center items-center w-16 h-16 bg-blue-800 rounded-full">
                <Users className="text-blue-200" size={32} />
              </div>
              <h3 className="font-bold text-xl mb-2">5000+</h3>
              <p className="text-blue-200">Happy Customers Served</p>
            </div>
            
            <div>
              <div className="mb-4 inline-flex justify-center items-center w-16 h-16 bg-blue-800 rounded-full">
                <Heart className="text-blue-200" size={32} />
              </div>
              <h3 className="font-bold text-xl mb-2">10+</h3>
              <p className="text-blue-200">Farming Families Supported</p>
            </div>
            
            <div>
              <div className="mb-4 inline-flex justify-center items-center w-16 h-16 bg-blue-800 rounded-full">
                <Leaf className="text-blue-200" size={32} />
              </div>
              <h3 className="font-bold text-xl mb-2">100%</h3>
              <p className="text-blue-200">Sustainably Sourced Coffee</p>
            </div>
            
            <div>
              <div className="mb-4 inline-flex justify-center items-center w-16 h-16 bg-blue-800 rounded-full">
                <Star className="text-blue-200" size={32} />
              </div>
              <h3 className="font-bold text-xl mb-2">4.7/5</h3>
              <p className="text-blue-200">Average Customer Rating</p>
            </div>
          </div>

          <div className="mt-12 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-4">What Our Customers Say</h3>
            <div className="bg-blue-800 p-6 rounded-lg">
              <p className="text-blue-100 italic mb-4 tracking-wide">
                " alpico's coffee is absolutely incredible! The floral notes and bright acidity make every morning special. Plus, knowing it's sustainably sourced makes it taste even better. "
              </p>
              <p className="text-blue-200 font-medium">- Priya S., Mumbai</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;