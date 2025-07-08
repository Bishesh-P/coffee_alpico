import { seoConfig } from '../config/seo';

// Organization Schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": seoConfig.business.name,
  "url": seoConfig.site.url,
  "logo": seoConfig.site.logo,
  "description": seoConfig.site.description,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": seoConfig.business.address.street,
    "addressLocality": seoConfig.business.address.city,
    "addressRegion": seoConfig.business.address.state,
    "postalCode": seoConfig.business.address.postalCode,
    "addressCountry": seoConfig.business.address.country
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": seoConfig.business.phone,
    "contactType": "customer service",
    "email": seoConfig.business.email
  },
  "sameAs": [
    `https://instagram.com/${seoConfig.site.twitterHandle.replace('@', '')}`,
    `https://twitter.com/${seoConfig.site.twitterHandle.replace('@', '')}`
  ]
};

// Local Business Schema
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Store",
  "name": seoConfig.business.name,
  "image": seoConfig.site.image,
  "description": seoConfig.site.description,
  "url": seoConfig.site.url,
  "telephone": seoConfig.business.phone,
  "email": seoConfig.business.email,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": seoConfig.business.address.street,
    "addressLocality": seoConfig.business.address.city,
    "addressRegion": seoConfig.business.address.state,
    "postalCode": seoConfig.business.address.postalCode,
    "addressCountry": seoConfig.business.address.country
  },
  "openingHours": seoConfig.business.hours,
  "priceRange": "$$"
};

// Product Schema Generator
export const generateProductSchema = (product: any) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  "image": product.image,
  "brand": {
    "@type": "Brand",
    "name": seoConfig.business.name
  },
  "offers": {
    "@type": "Offer",
    "price": product.price,
    "priceCurrency": "NPR",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": seoConfig.business.name
    }
  },
  "category": product.category,
  "sku": product.id.toString()
});

// Article Schema Generator
export const generateArticleSchema = (post: any) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": post.title,
  "description": post.excerpt,
  "image": post.image,
  "author": {
    "@type": "Person",
    "name": post.author
  },
  "publisher": {
    "@type": "Organization",
    "name": seoConfig.business.name,
    "logo": {
      "@type": "ImageObject",
      "url": seoConfig.site.logo
    }
  },
  "datePublished": post.publishedAt,
  "dateModified": post.publishedAt,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${seoConfig.site.url}/blog/${post.id}`
  }
});

// Breadcrumb Schema Generator
export const generateBreadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `${seoConfig.site.url}${item.url}`
  }))
});

// Website Schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": seoConfig.site.name,
  "url": seoConfig.site.url,
  "description": seoConfig.site.description,
  "publisher": {
    "@type": "Organization",
    "name": seoConfig.business.name
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${seoConfig.site.url}/products?search={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};