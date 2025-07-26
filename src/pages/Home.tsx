import React from 'react';
import SEOHead from '../components/common/SEOHead';
import { seoConfig } from '../config/seo';
import { organizationSchema, localBusinessSchema, websiteSchema } from '../utils/structuredData';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CompanyIntro from '../components/home/CompanyIntro';
import FAQ from '../components/home/FAQ';

const Home: React.FC = () => {
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
      <FAQ />
    </div>
  );
};

export default Home;
