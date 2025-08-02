import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  id: string;
}

interface SEOFriendlyFAQProps {
  faqs: FAQItem[];
  title?: string;
  className?: string;
  openItems: string[];
  toggleItem: (id: string) => void;
}

const SEOFriendlyFAQ: React.FC<SEOFriendlyFAQProps> = ({
  faqs,
  title = "Frequently Asked Questions",
  className = "",
  openItems,
  toggleItem
}) => {
  // Generate structured data for Google
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.replace(/<[^>]*>/g, '') // Strip HTML for structured data
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
      
      {/* FAQ Section */}
      <section 
        className={className}
        itemScope 
        itemType="https://schema.org/FAQPage"
        aria-label="Frequently Asked Questions"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold text-navy-900 mb-4"
              itemProp="name"
            >
              {title}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Find answers to common questions about Alpico Coffee products, ordering, and brewing.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="group bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                itemScope
                itemType="https://schema.org/Question"
                itemProp="mainEntity"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-slate-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  aria-expanded={openItems.includes(faq.id)}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <h3 
                    className="text-lg font-semibold text-navy-900 pr-4 group-hover:text-blue-600 transition-colors"
                    itemProp="name"
                  >
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 text-blue-600 group-hover:text-blue-700 transition-colors">
                    {openItems.includes(faq.id) ? (
                      <ChevronUp size={24} />
                    ) : (
                      <ChevronDown size={24} />
                    )}
                  </div>
                </button>
                
                <div
                  id={`faq-answer-${faq.id}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openItems.includes(faq.id) 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                  itemScope
                  itemType="https://schema.org/Answer"
                  itemProp="acceptedAnswer"
                >
                  <div className="px-6 pb-5">
                    <div 
                      className="text-slate-700 leading-relaxed bg-slate-50 rounded-lg p-4 border-l-4 border-blue-500"
                      itemProp="text"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SEOFriendlyFAQ;
