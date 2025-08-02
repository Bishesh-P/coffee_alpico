import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Coffee, Truck, Shield, Clock, HelpCircle, Package } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  id: string;
  iconName?: string;
}

interface HomeFAQProps {
  faqs: FAQItem[];
  openItems: string[];
  toggleItem: (id: string) => void;
}

const HomeFAQ: React.FC<HomeFAQProps> = ({ faqs, openItems, toggleItem }) => {
  // Icon mapping
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Coffee': return <Coffee className="text-blue-600" size={18} />;
      case 'Truck': return <Truck className="text-blue-600" size={18} />;
      case 'Shield': return <Shield className="text-blue-600" size={18} />;
      case 'Package': return <Package className="text-blue-600" size={18} />;
      case 'HelpCircle': return <HelpCircle className="text-blue-600" size={18} />;
      case 'Clock': return <Clock className="text-blue-600" size={18} />;
      default: return <HelpCircle className="text-blue-600" size={18} />;
    }
  };

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Organization structured data for better SEO
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Alpico Coffee",
    "description": "Premium Nepal coffee roasters offering specialty coffee, brewing equipment, and coffee education in Nepal and worldwide.",
    "url": "https://alpicocoffee.com",
    "logo": "https://alpicocoffee.com/images/alpico_logo.svg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Madhyapur Thimi",
      "addressLocality": "Bhaktapur",
      "postalCode": "44800",
      "addressCountry": "Nepal"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+977-986-9062187",
      "contactType": "customer service",
      "email": "alpicocoffeecompany@gmail.com",
      "availableLanguage": ["English", "Nepali"]
    },
    "sameAs": [
      "https://www.instagram.com/alpicocoffee/",
      "https://www.facebook.com/p/Alpico-Coffee-61568604861071/",
      "https://www.linkedin.com/company/alpico-coffee/"
    ]
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      {/* Organization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData)
        }}
      />

      <section 
        className="py-8 bg-gradient-to-br from-blue-50 via-white to-slate-50 relative overflow-hidden"
        itemScope 
        itemType="https://schema.org/FAQPage"
        aria-label="Frequently Asked Questions"
      >
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
                <h2 
                  className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-5 bg-gradient-to-r from-navy-900 to-blue-800 bg-clip-text text-transparent"
                  itemProp="name"
                >
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-blue-700 max-w-2xl mx-auto leading-relaxed">
                  Got questions about our coffee, shipping, or brewing? Find answers to the most common questions below.
                </p>
              </div>

              <div className="space-y-4 mb-12">
                {faqs.map((faq, index) => (
                  <div
                    key={faq.id}
                    className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-white/50 overflow-hidden transition-all duration-500 hover:shadow-lg hover:bg-white hover:scale-[1.005] hover:-translate-y-0.5"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: 'fadeInUp 0.6s ease-out forwards'
                    }}
                    itemScope
                    itemType="https://schema.org/Question"
                    itemProp="mainEntity"
                  >
                    {/* Question Section */}
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full p-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-1 transition-all duration-300"
                      aria-expanded={openItems.includes(faq.id)}
                      aria-controls={`faq-answer-${faq.id}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 flex-1">
                          <div className={`
                            flex-shrink-0 p-2 rounded-lg transition-all duration-500 shadow-sm
                            ${openItems.includes(faq.id) 
                              ? 'bg-gradient-to-br from-blue-500 to-navy-600 text-white shadow-md scale-105' 
                              : 'bg-gradient-to-br from-gray-100 to-gray-200 text-blue-600 group-hover:from-blue-100 group-hover:to-blue-200'
                            }
                          `}>
                            {getIcon(faq.iconName)}
                          </div>
                          <h3 
                            className={`
                              font-semibold text-base md:text-lg transition-all duration-300 leading-tight
                              ${openItems.includes(faq.id) ? 'text-blue-800' : 'text-navy-900 group-hover:text-blue-700'}
                            `}
                            itemProp="name"
                          >
                            {faq.question}
                          </h3>
                        </div>
                        <div className={`
                          flex-shrink-0 ml-3 p-1.5 rounded-full transition-all duration-500
                          ${openItems.includes(faq.id) ? 'bg-blue-100' : 'bg-gray-100 group-hover:bg-blue-50'}
                        `}>
                          <ChevronDown 
                            className={`
                              transition-all duration-500 ease-out
                              ${openItems.includes(faq.id) 
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
                        ${openItems.includes(faq.id) 
                          ? 'max-h-64 opacity-100' 
                          : 'max-h-0 opacity-0'
                        }
                      `}
                      itemScope
                      itemType="https://schema.org/Answer"
                      itemProp="acceptedAnswer"
                    >
                      <div className="px-4 pb-4">
                        <div className="border-t border-blue-200 pt-3">
                          <p 
                            className="text-gray-700 leading-relaxed text-sm md:text-base"
                            itemProp="text"
                          >
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
    </>
  );
};

export default HomeFAQ;
