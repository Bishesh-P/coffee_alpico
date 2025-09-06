import React from 'react';
import { /*Award,*/ Coffee, Leaf, Globe, Users, Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
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

  // Auto-rotation removed: users navigate via arrows only

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
                    Where It All Began
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    In the hills of Nepal, where the mountains touch the sky, our story begins. 
                    While many left to work abroad, we chose to stay and build something here. 
                    That’s when he discovered the hidden strength of Nepali coffee. 
                    Our land can grow world-class beans but the journey was not easy.     
                  </p>

                    <p className="text-gray-700 leading-relaxed">
                      Farmers worked hard, yet many coffee companies struggled with quality and production.
                      Nepal still had to import coffee from outside and it wasn’t nearly as good as ours. 
                      To make it worse, the best Nepali beans were exported abroad, while people here were left with lower-quality coffee. 
                      We knew this had to change.  
                      That’s how Alpico Coffee began with a dream to bring the finest Nepali coffee back home. 
                    </p>
                    {/* <p className="text-gray-700 mb-4 leading-relaxed">
                        In the hills of Nepal, where the mountains touch the sky, our story begins. 
                        While many left to work abroad, our founder Bishesh chose to stay and build something here. 
                    </p>

                    <p className="text-gray-700 mb-4 leading-relaxed">
                      That’s when he discovered the hidden strength of Nepali coffee. 
                      Our land can grow world-class beans but the journey was not easy. 
                    </p>

                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Farmers worked hard, yet many coffee companies struggled with quality and production.
                      Nepal still had to import coffee from outside and it wasn’t nearly as good as ours. 
                    </p>

                    <p className="text-gray-700 leading-relaxed">
                      To make it worse, the best Nepali beans were exported abroad, while people here were left with lower-quality coffee. 
                      Bishesh knew this had to change.  
                      That’s how Alpico Coffee began with a dream to bring the finest Nepali coffee back home. 
                    </p> */}

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
                    A Vision Born from Passion
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    In 2024, armed with nothing but determination and a deep respect for coffee craftsmanship, We founded Alpico Coffee. The name itself reflects our connection to the mountains – "Alp" for the alpine heights where our coffee grows, and "ico" representing the iconic taste we strive to create.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Our vision was simple yet ambitious: to create a bridge between Nepal's incredible coffee farmers and coffee lovers worldwide, ensuring that every cup tells the story of its origin while providing fair compensation to the hands that nurture each bean.
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
                      We learned that great coffee isn't just about the final product – it's about the entire journey. From understanding soil conditions to mastering roasting techniques, from packaging that preserves freshness to building relationships with customers who share our vision. Every challenge taught us something valuable.
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

            {/* Timeline removed per request */}
          </div>
        </div>
      </section>

      {/* Coffee Journey - From Beans to Cup */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-navy-900 mb-4">
              The Journey of Coffee: From Beans to Cup
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              This is the process that transforms coffee cherries from Nepal's mountain slopes 
              into the perfect cup of Alpico coffee. Each step tells the story of our effort and love for coffee
            </p>
          </div>

          {/* Step 1: Growing */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="relative">
                <div className="absolute -top-4 -left-4 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl z-10">
                  1
                </div>
                <img 
                  src="https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=600&h=400" 
                  alt="Coffee plants growing in Nepal mountains" 
                  className="rounded-lg shadow-lg w-full h-96 object-cover"
                />
                <div className="mt-4 bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                  <h5 className="font-bold text-green-800 mb-2">Nepal's Coffee Growing Regions</h5>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span className="font-medium">Sindhupalchowk:</span>
                      <span>Floral, citrus notes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Gulmi:</span>
                      <span>Sweet, chocolate hints</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Kavre:</span>
                      <span>Balanced, nutty flavors</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-green-200">
                    <p className="text-xs text-green-700 italic text-center">
                      "Coffee plants can produce for 20-40 years for commercial production."
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-navy-900 mb-4">
                  🌱 Growing in Paradise
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Our journey begins at altitudes of 1,200-1,600 meters in the pristine mountains of Nepal. 
                  Coffee plants thrive in the cool mountain air, rich volcanic soil, and perfect balance of 
                  sunshine and rainfall. Each plant takes approximately 4 years to mature and produce its first harvest.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  The coffee arabica species we grow belongs to the Typica and Bourbon varieties, also we use Catura varieties. Coffee in Nepal are shade grown. This means the coffee plants are grown under the shade of taller trees, instead of out in open fields with full sun.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h4 className="font-bold text-blue-800 mb-2">Why Altitude Matters</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Higher altitudes mean slower cherry development, resulting in denser beans with more 
                    complex flavors and higher acidity - the hallmark of specialty coffee.
                  </p>
                  <ul className="text-sm text-gray-700 list-disc list-inside">
                    <li>1,200-1,500m: Medium body, balanced acidity</li>
                    <li>1,500-1,800m: Bright acidity, floral notes</li>
                    <li>1,800m+: Complex flavors, wine-like characteristics</li>
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-green-100 p-3 rounded">
                    <div className="font-bold text-green-800">18-24°C</div>
                    <div className="text-xs text-green-600">Ideal Temperature</div>
                  </div>
                  <div className="bg-blue-100 p-3 rounded">
                    <div className="font-bold text-blue-800">2,000mm</div>
                    <div className="text-xs text-blue-600">Annual Rainfall</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Harvesting */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="lg:order-2 relative">
                <div className="absolute -top-4 -left-4 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl z-10">
                  2
                </div>
                <img 
                  src="https://images.pexels.com/photos/4022102/pexels-photo-4022102.jpeg?auto=compress&cs=tinysrgb&w=600&h=400" 
                  alt="Hand-picking ripe coffee cherries" 
                  className="rounded-lg shadow-lg w-full h-80 object-cover"
                />
                <div className="mt-4 bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg">
                  <h5 className="font-bold text-red-800 mb-3">Harvest Season Timeline</h5>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-400 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-800">November</span>
                          <span className="text-xs text-gray-600">Early harvest begins</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-800">December-January</span>
                          <span className="text-xs text-gray-600">Peak harvest period</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-orange-400 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-800">February-March</span>
                          <span className="text-xs text-gray-600">Final harvest rounds</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-red-200">
                    <p className="text-xs text-red-700 italic text-center">
                      "A skilled picker can identify perfect ripeness by touch and sound"
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:order-1">
                <h3 className="text-2xl font-serif font-bold text-navy-900 mb-4">
                  🍒 Hand-Picked Perfection
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  During harvest season (November to March) Mangshir to Chaitra, skilled farmers carefully hand-pick only 
                  the ripest, red coffee cherries. This selective picking ensures optimal sweetness 
                  and flavor development. A single tree yields about 2,000 cherries annually .
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  The harvesting process requires multiple passes through the same trees as cherries ripen 
                  at different rates. Experienced pickers can harvest 60-80 kg of cherries per day, selecting 
                  only those at peak ripeness. This labor-intensive method is what separates specialty coffee 
                  from commercial grade coffee.
                </p>
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <h4 className="font-bold text-green-800 mb-2">The Cherry Selection Process</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Perfect cherries should be deep red, firm to touch, and easily separate from the branch. 
                    This careful selection is what sets specialty coffee apart.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>✅ Deep red color</div>
                    <div>✅ Firm texture</div>
                    <div>✅ Sweet aroma</div>
                    <div>✅ Easy separation</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-red-100 p-3 rounded">
                    <div className="font-bold text-red-800">3-4</div>
                    <div className="text-xs text-red-600">Picking Rounds</div>
                  </div>
                  <div className="bg-orange-100 p-3 rounded">
                    <div className="font-bold text-orange-800">60-80kg</div>
                    <div className="text-xs text-orange-600">Daily Harvest</div>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded">
                    <div className="font-bold text-yellow-800">6hrs</div>
                    <div className="text-xs text-yellow-600">Processing Window</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Processing */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="relative">
                <div className="absolute -top-4 -left-4 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl z-10">
                  3
                </div>
                <img 
                  src="https://images.pexels.com/photos/4993439/pexels-photo-4993439.jpeg?auto=compress&cs=tinysrgb&w=600&h=400" 
                  alt="Coffee beans being washed and processed" 
                  className="rounded-lg shadow-lg w-full h-96 object-cover"
                />
                <div className="mt-4 bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-lg">
                  <h5 className="font-bold text-yellow-800 mb-3">Processing Quality Control</h5>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="text-center">
                      <div className="bg-yellow-200 rounded-lg p-2 mb-1">
                        <span className="text-xs font-bold text-yellow-800">pH Level</span>
                      </div>
                      <span className="text-xs text-gray-700">4.5 - 5.5</span>
                    </div>
                    <div className="text-center">
                      <div className="bg-amber-200 rounded-lg p-2 mb-1">
                        <span className="text-xs font-bold text-amber-800">Water Temp</span>
                      </div>
                      <span className="text-xs text-gray-700">18-22°C</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-xs text-gray-700">
                    <div className="flex justify-between">
                      <span>✓ Cherry sorting</span>
                      <span>99.5% purity</span>
                    </div>
                    <div className="flex justify-between">
                      <span>✓ Fermentation monitoring</span>
                      <span>12-48 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>✓ Moisture content</span>
                      <span>10-12% final</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-yellow-200">
                    <p className="text-xs text-yellow-700 italic text-center">
                      "The fermentation process creates unique flavor compounds found nowhere else"
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-navy-900 mb-4">
                  🔄 Processing Magic
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Within 12 hours of picking, cherries undergo processing to remove the outer fruit and 
                  reveal the green coffee beans inside. We use both washed and natural processing methods, 
                  each creating unique flavor profiles. Also sometimes we use Anaerobic fermentation processing method. The beans are then carefully dried to the perfect 
                  moisture content of 10-12%.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  The processing stage is critical for flavor development. During fermentation, natural enzymes 
                  break down the mucilage, while careful monitoring prevents over-fermentation that could 
                  create off-flavors. Temperature, pH levels, and timing are all precisely controlled to 
                  ensure consistent quality.
                </p>
                <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                  <h4 className="font-bold text-yellow-800 mb-3">Processing Methods</h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="bg-yellow-200 rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <strong className="text-yellow-900">Washed Process:</strong>
                        <p className="text-sm text-gray-700">Cherry pulp removed, beans fermented in water for 12-48 hours, then dried. Creates clean, bright flavors with pronounced acidity.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-yellow-200 rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></div>
                      <div>
                        <strong className="text-yellow-900">Natural Process:</strong>
                        <p className="text-sm text-gray-700">Whole cherries dried in the sun for 2-4 weeks, beans removed after drying. Produces fruity, wine-like notes with fuller body.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-blue-100 p-3 rounded">
                    <div className="font-bold text-blue-800">12-48hrs</div>
                    <div className="text-xs text-blue-600">Fermentation</div>
                  </div>
                  <div className="bg-orange-100 p-3 rounded">
                    <div className="font-bold text-orange-800">10-12%</div>
                    <div className="text-xs text-orange-600">Final Moisture</div>
                  </div>
                  <div className="bg-green-100 p-3 rounded">
                    <div className="font-bold text-green-800">2-4 weeks</div>
                    <div className="text-xs text-green-600">Drying Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Roasting */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="lg:order-2 relative">
                <div className="absolute -top-4 -left-4 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl z-10">
                  4
                </div>
                <img 
                  src="https://images.pexels.com/photos/4350061/pexels-photo-4350061.jpeg?auto=compress&cs=tinysrgb&w=600&h=400" 
                  alt="Coffee beans being roasted in a professional roaster" 
                  className="rounded-lg shadow-lg w-full h-96 object-cover"
                />
                <div className="mt-4 bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg">
                  <h5 className="font-bold text-red-800 mb-3">Roast Profile Development</h5>
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Light Roast</span>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-yellow-300 rounded mr-2"></div>
                        <span className="text-xs text-gray-600">Bright & Acidic</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Medium Roast</span>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-amber-600 rounded mr-2"></div>
                        <span className="text-xs text-gray-600">Balanced & Sweet</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Dark Roast</span>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-amber-900 rounded mr-2"></div>
                        <span className="text-xs text-gray-600">Bold & Rich</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-red-200">
                    <p className="text-xs text-red-700 italic text-center">
                      "The 'first crack' sound tells our roasters when perfection begins"
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:order-1">
                <h3 className="text-2xl font-serif font-bold text-navy-900 mb-4">
                  🔥 The Art of Roasting
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  This is where science meets artistry. Our master roasters carefully monitor time, 
                  temperature, and airflow to develop each origin's unique characteristics. Generally, the obtained green beans doesnot have any defined taste and aroma. Hence, roasting brings the flavour to the coffee. The Maillard 
                  reaction creates hundreds of flavor compounds, transforming green beans into aromatic, 
                  brown coffee ready for brewing.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Roasting profiles are developed through extensive cupping and testing. We track over 20 
                  variables including charge temperature, rate of rise, development time ratio, and airflow 
                  adjustments. Each batch is precisely timed to achieve the desired flavor profile while 
                  maintaining consistency across production runs.
                </p>
                <div className="bg-red-50 p-4 rounded-lg mb-4">
                  <h4 className="font-bold text-red-800 mb-3">Roasting Journey</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">Drying Phase (0-5 min)</span>
                      <span className="font-semibold text-red-700">20°C → 160°C</span>
                    </div>
                    <div className="w-full bg-red-200 rounded-full h-1">
                      <div className="bg-red-500 h-1 rounded-full w-1/3"></div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">First Crack (6-8 min)</span>
                      <span className="font-semibold text-red-700">160°C → 190°C</span>
                    </div>
                    <div className="w-full bg-red-200 rounded-full h-1">
                      <div className="bg-red-500 h-1 rounded-full w-2/3"></div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-700">Development (8-12 min)</span>
                      <span className="font-semibold text-red-700">190°C → 205°C</span>
                    </div>
                    <div className="w-full bg-red-200 rounded-full h-1">
                      <div className="bg-red-500 h-1 rounded-full w-full"></div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-orange-100 p-3 rounded">
                    <div className="font-bold text-orange-800">8-12min</div>
                    <div className="text-xs text-orange-600">Roast Time</div>
                  </div>
                  <div className="bg-red-100 p-3 rounded">
                    <div className="font-bold text-red-800">205°C</div>
                    <div className="text-xs text-red-600">Final Temp</div>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded">
                    <div className="font-bold text-yellow-800">24hrs</div>
                    <div className="text-xs text-yellow-600">Degassing</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5: Grinding & Brewing */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="relative">
                <div className="absolute -top-4 -left-4 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl z-10">
                  5
                </div>
                <img 
                  src="https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=600&h=400" 
                  alt="Coffee beans being ground and brewed" 
                  className="rounded-lg shadow-lg w-full h-96 object-cover"
                />
                <div className="mt-4 bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg">
                  <h5 className="font-bold text-purple-800 mb-3">Brewing Equipment Guide</h5>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="text-center">
                      <div className="bg-purple-200 rounded-lg p-2 mb-1">
                        <span className="text-xs font-bold text-purple-800">☕</span>
                      </div>
                      <span className="text-xs text-gray-700">Espresso</span>
                    </div>
                    <div className="text-center">
                      <div className="bg-indigo-200 rounded-lg p-2 mb-1">
                        <span className="text-xs font-bold text-indigo-800">🗳️</span>
                      </div>
                      <span className="text-xs text-gray-700">Pour Over</span>
                    </div>
                    <div className="text-center">
                      <div className="bg-purple-200 rounded-lg p-2 mb-1">
                        <span className="text-xs font-bold text-purple-800">🫖</span>
                      </div>
                      <span className="text-xs text-gray-700">French Press</span>
                    </div>
                  </div>
                  {/* Grind sizes moved here below the image section */}
                  <div className="mt-2 grid grid-cols-3 gap-2 text-[11px] sm:text-xs text-center">
                    <div>
                      <div className="font-semibold text-purple-700">Espresso</div>
                      <div className="text-gray-600">Grind: Fine</div>
                    </div>
                    <div>
                      <div className="font-semibold text-purple-700">Pour Over</div>
                      <div className="text-gray-600">Grind: Medium</div>
                    </div>
                    <div>
                      <div className="font-semibold text-purple-700">French Press</div>
                      <div className="text-gray-600">Grind: Coarse</div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-purple-200">
                    <p className="text-xs text-purple-700 italic text-center">
                      "The perfect grind unlocks 9 months of care in every sip"
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-navy-900 mb-4">
                  ⚡ Grinding & Brewing
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  The final transformation happens in your kitchen. Grinding releases aromatic compounds 
                  that have been locked inside the roasted beans. Whether you prefer espresso, pour-over, 
                  or French press, the grind size and brewing method will make difference in taste.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Grinding accelerates flavor degradation, so we recommend grinding just before brewing. 
                  The grind size affects extraction rate - finer grinds extract faster and can become 
                  bitter, while coarser grinds extract slower and may taste sour if under-extracted. 
                  Water quality, temperature, and contact time all influence the final cup.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg mb-4">
                  <h4 className="font-bold text-purple-800 mb-3">Brewing Guide</h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-3 text-xs">
                      <div className="text-center">
                        <div className="font-semibold text-purple-700">Espresso</div>
                        <div className="text-gray-600">25–30s</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-purple-700">Pour Over</div>
                        <div className="text-gray-600">3–4 min</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-purple-700">French Press</div>
                        <div className="text-gray-600">4 min</div>
                      </div>
                    </div>
                    <div className="border-t pt-3">
                      <div className="text-sm text-gray-700">
                        <strong>Golden Ratio:</strong> 1:15 coffee-to-water ratio<br/>
                        <strong>Water Temp:</strong> 195-205°F (90-96°C)<br/>
                        <strong>Total Time:</strong> 3-6 minutes depending on method
                      </div>
                    </div>
                  </div>
                </div>
                {/* Moved Pro Tip here below the Brewing Guide */}
                <div className="bg-purple-100 p-2 rounded text-center mb-4">
                  <span className="text-xs font-medium text-purple-800">Pro Tip: Grind 30 seconds before brewing</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-purple-100 p-3 rounded">
                    <div className="font-bold text-purple-800">1:15</div>
                    <div className="text-xs text-purple-600">Coffee:Water</div>
                  </div>
                  <div className="bg-blue-100 p-3 rounded">
                    <div className="font-bold text-blue-800">200°F</div>
                    <div className="text-xs text-blue-600">Water Temp</div>
                  </div>
                  <div className="bg-green-100 p-3 rounded">
                    <div className="font-bold text-green-800">30sec</div>
                    <div className="text-xs text-green-600">Grind Before</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Final Step: Your Perfect Cup */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white text-center">
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <div className="bg-white text-blue-600 w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl mx-auto">
                  ☕
                </div>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">Your Perfect Cup</h3>
              <p className="text-blue-100 text-lg leading-relaxed">
                After this incredible journey from the mountains of Nepal to your cup, every sip carries 
                the story of dedicated farmers, expert processing, artful roasting, and your perfect brewing. 
                This is more than coffee - it's a connection to the land, the people, and the passion that 
                makes Alpico special.
              </p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold">9 months</div>
                  <div className="text-blue-200 text-sm">From planting to harvest</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">2000+</div>
                  <div className="text-blue-200 text-sm">Cherries per tree annually</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">1 lb</div>
                  <div className="text-blue-200 text-sm">Of coffee from 2000 cherries</div>
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

          <div className="mt-12 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-6 text-white text-center">What Our Customers Say</h3>
            <div className="relative">
              <div className="bg-blue-800/90 p-6 md:p-8 rounded-xl shadow-lg border border-blue-700/40">
                <p className="text-blue-100 italic mb-4 md:mb-6 tracking-wide text-center">“{testimonials[currentTestimonial].quote}”</p>
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