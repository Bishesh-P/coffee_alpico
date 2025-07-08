import React, { useState } from 'react';
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
    question: "How fresh is your coffee?",
    answer: "We roast all our coffee beans to order and ship within 24-48 hours of roasting. This ensures you receive the freshest coffee possible, typically within 2-5 days of the roast date for optimal flavor.",
    icon: <Coffee className="text-blue-600" size={24} />
  },
  {
    id: 2,
    question: "What's your shipping policy?",
    answer: "We offer free shipping on orders over Rs 1400. Orders under this amount have a flat shipping rate of NPR 150. All orders are processed within 1-2 business days within the Kathmandu Valley and typically arrive within 3-4 business days outside the valley.",
    icon: <Truck className="text-blue-600" size={24} />
  },
  {
    id: 3,
    question: "Do you offer a satisfaction guarantee?",
    answer: "Absolutely! We stand behind the quality of our coffee. If you're not completely satisfied with your purchase, contact us within 30 days for a full refund or exchange. Your satisfaction is our priority.",
    icon: <Shield className="text-blue-600" size={24} />
  },
  {
    id: 4,
    question: "How should I store my coffee?",
    answer: "Store your coffee beans in an airtight container in a cool, dark place away from direct sunlight, heat, and moisture. Avoid storing in the refrigerator or freezer. Use within 2-4 weeks of the roast date for best flavor.",
    icon: <Package className="text-blue-600" size={24} />
  },
  {
    id: 5,
    question: "Do you offer wholesale or bulk pricing?",
    answer: "Yes! We offer competitive wholesale pricing for cafes, restaurants, offices, and bulk orders. Contact our wholesale team at  alpicocoffeecompany@gmail.com for custom pricing and minimum order requirements.",
    icon: <HelpCircle className="text-blue-600" size={24} />
  },
  {
    id: 6,
    question: "What brewing methods work best with your coffee?",
    answer: "Our coffees are versatile and work well with various brewing methods. Light roasts excel in pour-over and drip methods, medium roasts are perfect for espresso and French press, while dark roasts shine in espresso and cold brew preparations.",
    icon: <Clock className="text-blue-600" size={24} />
  }
];

const FAQ: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="py-10 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="gap-12 items-start">
          {/* grid grid-cols-1 lg:grid-cols-2  */}
          {/* FAQ Content */}
          <div>
            <div className="text-left mb-8">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-blue-800 ">
                {/* max-w-lg */}
                Got questions about our coffee, shipping, or brewing? Find answers to the most common questions below.
              </p>
            </div>

            <div className="space-y-4">
              {faqData.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  {/* Question Section */}
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`
                          flex-shrink-0 p-2 rounded-full transition-all duration-300
                          ${openItem === faq.id ? 'bg-blue-100' : 'bg-gray-100'}
                        `}>
                          {faq.icon}
                        </div>
                        <h3 className={`
                          font-bold text-lg transition-colors duration-300
                          ${openItem === faq.id ? 'text-blue-800' : 'text-navy-900'}
                        `}>
                          {faq.question}
                        </h3>
                      </div>
                      <ChevronDown 
                        className={`
                          transition-all duration-300 flex-shrink-0
                          ${openItem === faq.id 
                            ? 'rotate-180 text-blue-600' 
                            : 'text-gray-400'
                          }
                        `} 
                        size={20} 
                      />
                    </div>
                  </button>

                  {/* Answer Section - Expandable */}
                  <div className={`
                    transition-all duration-500 ease-in-out overflow-hidden
                    ${openItem === faq.id 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                    }
                  `}>
                    <div className="px-6 pb-6">
                      <div className="border-t border-blue-100 pt-4">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
              <br></br>
          {/* Image Section */}
          <div className="lg:pl-8">
            <div className="relative">
              <div className="overflow-hidden rounded-lg shadow-lg">
                <img 
                  src="https://images.pexels.com/photos/13736391/pexels-photo-13736391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Man Preparing Espresso in Cafe" 
                  className="w-full h-96 object-cover filter grayscale hover:filter-none transition-all duration-700 transform hover:scale-105"
                />
              </div>
              
              {/* Overlay text */}
              <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-10 transition-all duration-700 rounded-lg flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Expert Coffee Guidance</h3>
                  <p className="text-sm opacity-90">
                    Our team is here to help you find the perfect coffee and brewing method for your taste.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional decorative element */}
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-navy-900 mb-2">
                  Still have questions?
                </h3>
                <p className="text-gray-600 mb-4">
                  Our coffee experts are here to help you find the perfect brew.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a 
                    href="/contact" 
                    className="inline-flex items-center justify-center px-6 py-3 bg-navy-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
                  >
                    Contact Us
                  </a>
                  <a 
                    href="mailto:alpicocoffeecompany@gmail.com" 
                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-navy-900 text-navy-900 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                  >
                    Email Support
                  </a>
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