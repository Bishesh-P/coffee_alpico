import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Tag, Search } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';
import { seoConfig } from '../config/seo';
import { generateBreadcrumbSchema } from '../utils/structuredData';
import { useBlog } from '../context/BlogContext';

const Blog: React.FC = () => {
  const { posts, getFeaturedPosts } = useBlog();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [imageLoadStates, setImageLoadStates] = useState<Record<string, boolean>>({});

  const featuredPosts = getFeaturedPosts();
  const lcpPost = featuredPosts[0];
  const SUPABASE_TRANSFORMS = (import.meta as any).env?.VITE_SUPABASE_IMAGE_TRANSFORM_ENABLED === 'true';

  // Helper: build responsive srcSet for Supabase images (render endpoint)
  const buildSupabaseSrcSet = (
    url: string,
    widths: number[] = [600, 900, 1200],
    opts?: { aspect?: { w: number; h: number }; quality?: number; format?: 'webp' | 'jpeg' }
  ) => {
    try {
      const u = new URL(url);
      const isSupabase = u.hostname.endsWith('.supabase.co') && u.pathname.includes('/storage/v1/object/');
      if (!isSupabase) return undefined;
      const renderPath = u.pathname.replace('/storage/v1/object/', '/storage/v1/render/image/');
      const base = `${u.protocol}//${u.host}${renderPath}`;
      const quality = String(opts?.quality ?? 75);
      const format = String(opts?.format ?? 'webp');
      return widths.map((w) => {
        const qs = new URLSearchParams({ width: String(w), quality, format });
        if (opts?.aspect) {
          const h = Math.round((w * opts.aspect.h) / opts.aspect.w);
          qs.set('height', String(h));
        }
        return `${base}?${qs.toString()} ${w}w`;
      }).join(', ');
    } catch {
      return undefined;
    }
  };

  // Single transformed URL for preloading
  const supabaseTransformed = (
    url?: string,
    width = 1200,
    aspect?: { w: number; h: number },
    quality = 75,
    format: 'webp' | 'jpeg' = 'webp'
  ) => {
    if (!url) return undefined;
    try {
      // If transforms are disabled, just return the original URL
      if (!(import.meta as any).env?.VITE_SUPABASE_IMAGE_TRANSFORM_ENABLED || (import.meta as any).env?.VITE_SUPABASE_IMAGE_TRANSFORM_ENABLED !== 'true') {
        return url;
      }
      const u = new URL(url);
      const isSupabase = u.hostname.endsWith('.supabase.co') && u.pathname.includes('/storage/v1/object/');
      if (!isSupabase) return url;
      const renderPath = u.pathname.replace('/storage/v1/object/', '/storage/v1/render/image/');
      const base = `${u.protocol}//${u.host}${renderPath}`;
      const qs = new URLSearchParams({ width: String(width), quality: String(quality), format });
      if (aspect) {
        const h = Math.round((width * aspect.h) / aspect.w);
        qs.set('height', String(h));
      }
      return `${base}?${qs.toString()}`;
    } catch {
      return url;
    }
  };
  
  // Preload critical images for faster loading
  useEffect(() => {
    const preloadImages = () => {
      // Preload featured post images and fallback image
      const imagesToPreload = [
        ...featuredPosts.slice(0, 2).map(post => post.image),
        'https://images.pexels.com/photos/5328288/pexels-photo-5328288.jpeg?auto=compress&cs=tinysrgb&format=webp&w=800&h=600'
      ];

      imagesToPreload.forEach(src => {
        if (src) {
          const img = new Image();
          img.onload = () => {
            setImageLoadStates(prev => ({ ...prev, [src]: true }));
          };
          img.src = src;
        }
      });
    };

    preloadImages();
  }, [featuredPosts]);

  // Get all unique tags
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

  // Filter posts based on search and tag
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === '' || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' }
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  return (
    <div className="pt-20 md:pt-16">
      <SEOHead
        title={seoConfig.pages.blog.title}
        description={seoConfig.pages.blog.description}
        keywords={seoConfig.pages.blog.keywords}
        url="/blog"
        structuredData={breadcrumbSchema}
      />
      
      {/* Properly inject preload for the LCP image using Helmet */}
  {lcpPost && (
        <Helmet>
          <link
            rel="preload"
            as="image"
    href={SUPABASE_TRANSFORMS ? (supabaseTransformed(lcpPost.image, 1200, { w: 4, h: 3 }) || lcpPost.image) : lcpPost.image}
            // @ts-expect-error fetchpriority attribute
            fetchpriority="high"
          />
        </Helmet>
      )}
      
      {/* Hero Section */}
      <div 
        className="relative py-10 md:py-14 bg-navy-900 text-white px-4"
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
            Coffee Stories & Insights
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Discover brewing techniques, origin stories, and the latest from the world of specialty coffee.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-serif font-bold text-navy-900 mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post, idx) => (
                <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <Link to={`/blog/${post.id}`}>
                    <div className="h-64 overflow-hidden bg-gray-200 relative">
                      {!imageLoadStates[post.image] && (
                        <div className="absolute inset-0 bg-gray-300 animate-pulse flex items-center justify-center">
                          <div className="w-12 h-12 bg-gray-400 rounded-full animate-pulse"></div>
                        </div>
                      )}
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className={`w-full h-full object-cover hover:scale-105 transition-transform duration-300 ${
                          imageLoadStates[post.image] ? 'opacity-100' : 'opacity-0'
                        }`}
                        width={1200}
                        height={800}
                        // Prioritize only the first featured image (likely LCP)
                        loading={idx === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                        // @ts-expect-error fetchpriority attribute
                        fetchpriority={idx === 0 ? 'high' : 'auto'}
                        // Supabase responsive sources (only if transforms are enabled)
                        srcSet={SUPABASE_TRANSFORMS ? buildSupabaseSrcSet(post.image, [600, 900, 1200], { aspect: { w: 4, h: 3 } }) : undefined}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        onLoad={() => setImageLoadStates(prev => ({ ...prev, [post.image]: true }))}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.pexels.com/photos/5328288/pexels-photo-5328288.jpeg?auto=compress&cs=tinysrgb&format=webp&w=800&h=600';
                          setImageLoadStates(prev => ({ ...prev, [post.image]: true }));
                        }}
                      />
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-blue-600 mb-3">
                      <User size={16} className="mr-1" />
                      <span className="mr-4">{post.author}</span>
                      <Calendar size={16} className="mr-1" />
                      <span className="mr-4">{formatDate(post.publishedAt)}</span>
                      <Clock size={16} className="mr-1" />
                      <span>{post.readTime} min read</span>
                    </div>
                    <Link to={`/blog/${post.id}`}>
                      <h3 className="text-xl font-bold text-navy-900 hover:text-blue-700 transition-colors mb-3">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 bg-blue-100 text-navy-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Search and Filter */}
        <section className="mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Categories</option>
                  {allTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* All Posts */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-navy-900">
              {searchTerm || selectedTag ? 'Search Results' : 'All Articles'}
            </h2>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <Link to={`/blog/${post.id}`}>
                    <div className="h-48 overflow-hidden bg-gray-200">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        width={800}
                        height={600}
                        loading="lazy"
                        decoding="async"
                        // Non-critical grid images: give browser a hint to de-prioritize
                        // @ts-expect-error fetchpriority attribute
                        fetchpriority="low"
                        srcSet={SUPABASE_TRANSFORMS ? buildSupabaseSrcSet(post.image, [400, 800, 1200], { aspect: { w: 4, h: 3 } }) : undefined}
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.pexels.com/photos/5328288/pexels-photo-5328288.jpeg?auto=compress&cs=tinysrgb&format=webp&w=800&h=600';
                        }}
                      />
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-blue-600 mb-3">
                      <User size={14} className="mr-1" />
                      <span className="mr-3">{post.author}</span>
                      <Clock size={14} className="mr-1" />
                      <span>{post.readTime} min</span>
                    </div>
                    <Link to={`/blog/${post.id}`}>
                      <h3 className="text-lg font-bold text-navy-900 hover:text-blue-700 transition-colors mb-2">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 bg-blue-100 text-navy-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Blog;