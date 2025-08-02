import React, { useState } from 'react';
import SEOHead from '../components/common/SEOHead';
import { seoConfig } from '../config/seo';
import { organizationSchema, localBusinessSchema, websiteSchema } from '../utils/structuredData';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CompanyIntro from '../components/home/CompanyIntro';
import HomeFAQ from '../components/home/HomeFAQ';
import { homeFAQs } from '../data/faqData';

const Home: React.FC = () => {
  const [openFAQItems, setOpenFAQItems] = useState<string[]>([]);

  const toggleFAQItem = (id: string) => {
    setOpenFAQItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, localBusinessSchema, websiteSchema]
  };

  return (
    <div>
      <SEOHead
        title={seoConfig.pages.home.title}
        description={seoConfig.pages.home.description}
        keywords={seoConfig.pages.home.keywords}
        url="/"
        structuredData={combinedSchema}
      />
      <Hero />
      <FeaturedProducts />
      <CompanyIntro />
      <HomeFAQ
        faqs={homeFAQs}
        openItems={openFAQItems}
        toggleItem={toggleFAQItem}
      />
    </div>
  );
};

export default Home;
