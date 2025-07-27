import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Coffee, Truck, Shield, Clock, HelpCircle, Package } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon: React.ReactNode;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "How fresh is your Nepal coffee?",
    answer: "We roast all our premium Arabica coffee beans fresh to order and ship within 24-48 hours of roasting. This ensures you receive the freshest Nepal coffee possible, typically within 2-5 days of the roast date for optimal flavor and aroma.",
    icon: <Coffee className="text-blue-600" size={24} />
  },
  {
    id: 2,
    question: "What's your coffee delivery policy in Nepal?",
    answer: "We offer free coffee delivery on orders over Rs 1400 throughout Nepal. Orders under this amount have a flat shipping rate of NPR 150. All coffee orders are processed within 1-2 business days within the Kathmandu Valley and typically arrive within 3-4 business days outside the valley.",
    icon: <Truck className="text-blue-600" size={24} />
  },
  {
    id: 3,
    question: "Do you guarantee the quality of your specialty coffee?",
    answer: "Absolutely! We stand behind the quality of our specialty Nepal coffee. If you're not completely satisfied with your premium coffee purchase, contact us within 30 days for a full refund or exchange. Your coffee satisfaction is our priority.",
    icon: <Shield className="text-blue-600" size={24} />
  },
  {
    id: 4,
    question: "How should I store my coffee beans properly?",
    answer: "Store your Arabica coffee beans in an airtight container in a cool, dark place away from direct sunlight, heat, and moisture. Avoid storing coffee in the refrigerator or freezer. Use within 2-4 weeks of the roast date for best coffee flavor.",
    icon: <Package className="text-blue-600" size={24} />
  },
  {
    id: 5,
    question: "Do you offer wholesale coffee or bulk coffee pricing?",
    answer: "Yes! We offer competitive wholesale coffee pricing for cafes, restaurants, offices, and bulk coffee orders. Contact our wholesale team at alpicocoffeecompany@gmail.com for custom coffee pricing and minimum order requirements.",
    icon: <HelpCircle className="text-blue-600" size={24} />
  },
  {
    id: 6,
    question: "What coffee brewing methods work best with your beans?",
    answer: "Our Nepal coffee beans are versatile and work well with various brewing methods. Light roast coffee excels in pour-over and drip coffee methods, medium roast coffee is perfect for espresso machines and French press, while dark roast coffee shines in espresso and cold brew preparations.",
    icon: <Clock className="text-blue-600" size={24} />
  }
];

const FAQ: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="py-8 bg-gradient-to-br from-blue-50 via-white to-slate-50 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-900 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="gap-8 items-start">
          {/* FAQ Content */}
          <div>
            <div className="text-center mb-10 max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-navy-600 rounded-xl mb-5 shadow-lg">
                <HelpCircle className="text-white" size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-5 bg-gradient-to-r from-navy-900 to-blue-800 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-blue-700 max-w-2xl mx-auto leading-relaxed">
                Got questions about our coffee, shipping, or brewing? Find answers to the most common questions below.
              </p>
            </div>

            <div className="space-y-4 mb-12">
              {faqData.map((faq, index) => (
                <div
                  key={faq.id}
                  className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-white/50 overflow-hidden transition-all duration-500 hover:shadow-lg hover:bg-white hover:scale-[1.005] hover:-translate-y-0.5"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Question Section */}
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-1 transition-all duration-300"
                    aria-expanded={openItem === faq.id}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className={`
                          flex-shrink-0 p-2 rounded-lg transition-all duration-500 shadow-sm
                          ${openItem === faq.id 
                            ? 'bg-gradient-to-br from-blue-500 to-navy-600 text-white shadow-md scale-105' 
                            : 'bg-gradient-to-br from-gray-100 to-gray-200 text-blue-600 group-hover:from-blue-100 group-hover:to-blue-200'
                          }
                        `}>
                          {React.cloneElement(faq.icon as React.ReactElement, { size: 18 })}
                        </div>
                        <h3 className={`
                          font-semibold text-base md:text-lg transition-all duration-300 leading-tight
                          ${openItem === faq.id ? 'text-blue-800' : 'text-navy-900 group-hover:text-blue-700'}
                        `}>
                          {faq.question}
                        </h3>
                      </div>
                      <div className={`
                        flex-shrink-0 ml-3 p-1.5 rounded-full transition-all duration-500
                        ${openItem === faq.id ? 'bg-blue-100' : 'bg-gray-100 group-hover:bg-blue-50'}
                      `}>
                        <ChevronDown 
                          className={`
                            transition-all duration-500 ease-out
                            ${openItem === faq.id 
                              ? 'rotate-180 text-blue-600 scale-105' 
                              : 'text-gray-500 group-hover:text-blue-500'
                            }
                          `} 
                          size={16} 
                        />
                      </div>
                    </div>
                  </button>

                  {/* Answer Section - Expandable */}
                  <div 
                    id={`faq-answer-${faq.id}`}
                    className={`
                      transition-all duration-700 ease-in-out overflow-hidden
                      ${openItem === faq.id 
                        ? 'max-h-64 opacity-100' 
                        : 'max-h-0 opacity-0'
                      }
                    `}
                  >
                    <div className="px-4 pb-4">
                      <div className="border-t border-blue-200 pt-3">
                        <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </div>
            
            {/* Enhanced Image Section */}
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 items-start">
                {/* Left: Coffee Expert Image */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-navy-600/20 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-700"></div>
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                    <img 
                      src="https://images.pexels.com/photos/13736391/pexels-photo-13736391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                      alt="Professional barista preparing artisanal espresso with precision and expertise" 
                      className="w-full h-[300px] sm:h-[350px] lg:h-[450px] object-cover filter grayscale hover:filter-none transition-all duration-1000 transform group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.pexels.com/photos/13836025/pexels-photo-13836025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
                      }}
                    />
                    
                    {/* Enhanced Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent hover:from-black/50 transition-all duration-700 rounded-3xl flex items-end">
                      <div className="p-4 lg:p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex items-center mb-2 lg:mb-3">
                          <div className="w-2 lg:w-3 h-2 lg:h-3 bg-green-400 rounded-full mr-2 lg:mr-3 animate-pulse"></div>
                          <span className="text-green-400 font-semibold text-xs lg:text-sm uppercase tracking-wider">Expert Available</span>
                        </div>
                        <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-1 lg:mb-3 font-serif">Expert Coffee Guidance</h3>
                        <p className="text-blue-100 text-xs sm:text-sm lg:text-base opacity-90 leading-relaxed">
                          Our certified baristas are here to help you discover the perfect coffee and brewing method tailored to your unique taste preferences.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Contact Card */}
                <div className="px-2 sm:px-0">
                  {/* Main Contact Card */}
                  <div className="bg-gradient-to-br from-white via-blue-50/50 to-white backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-4 sm:p-6 lg:p-8 group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-[300px] sm:h-[350px] lg:h-[450px] flex flex-col justify-center">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-500 to-navy-600 rounded-xl lg:rounded-2xl mb-3 sm:mb-4 lg:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500">
                        <HelpCircle className="text-white" size={20} />
                      </div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-navy-900 mb-2 sm:mb-3 lg:mb-4 font-serif">
                        Still have questions?
                      </h3>
                      <p className="text-gray-600 mb-4 sm:mb-6 lg:mb-8 text-sm sm:text-base lg:text-lg leading-relaxed px-2">
                        Our coffee experts are here to help you find the perfect brew and answer any questions about our premium Nepal coffee.
                      </p>
                      
                      <div className="space-y-2 sm:space-y-3 lg:space-y-4 px-2">
                        <Link 
                          to="/contact"
                          className="group/btn inline-flex items-center justify-center w-full px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 bg-gradient-to-r from-navy-900 to-blue-800 text-white rounded-lg lg:rounded-xl hover:from-blue-800 hover:to-navy-700 transition-all duration-300 font-semibold text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                          role="button"
                          aria-label="Navigate to contact page for personalized assistance"
                        >
                          <span className="mr-2">Contact Our Experts</span>
                          <div className="transform group-hover/btn:translate-x-1 transition-transform duration-300">→</div>
                        </Link>
                        
                        <a 
                          href="mailto:alpicocoffeecompany@gmail.com" 
                          className="group/btn inline-flex items-center justify-center w-full px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 border-2 border-navy-900 text-navy-900 rounded-lg lg:rounded-xl hover:bg-navy-900 hover:text-white transition-all duration-300 font-semibold text-sm sm:text-base lg:text-lg shadow-sm hover:shadow-lg transform hover:-translate-y-1"
                          aria-label="Send email to our coffee experts"
                        >
                          <span className="mr-2">Email Support</span>
                          <div className="transform group-hover/btn:translate-x-1 transition-transform duration-300">✉</div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

