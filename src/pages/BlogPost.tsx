import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import SEOHead from '../components/common/SEOHead';
import { generateBlogSEO } from '../config/seo';
import { generateArticleSchema, generateBreadcrumbSchema } from '../utils/structuredData';
import { useBlog } from '../context/BlogContext';
import Button from '../components/common/Button';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPost } = useBlog();
  
  const post = id ? getPost(id) : undefined;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!post) {
    return (
      <div className="pt-16">
        <SEOHead
          title="Blog Post Not Found | Alpico Coffee"
          description="The blog post you're looking for could not be found."
          noIndex={true}
        />
        <div className="container mx-auto px-4 py-32 text-center">
          <h2 className="text-2xl font-bold text-navy-900 mb-4">Post not found</h2>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button variant="primary">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Generate SEO data
  const blogSEO = generateBlogSEO(post);
  const articleSchema = generateArticleSchema(post);
  
  // Breadcrumb schema
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.id}` }
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [articleSchema, breadcrumbSchema]
  };

  return (
    <div className="pt-16">
      <SEOHead
        title={blogSEO.title}
        description={blogSEO.description}
        keywords={blogSEO.keywords}
        url={`/blog/${post.id}`}
        image={post.image}
        type={blogSEO.type}
        author={blogSEO.author}
        publishedTime={blogSEO.publishedTime}
        modifiedTime={blogSEO.modifiedTime}
        structuredData={combinedSchema}
      />
      
      {/* Hero Section */}
      <div 
        className="relative py-32 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${post.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative container mx-auto px-4">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-white hover:text-blue-200 mb-6 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Blog
          </Link>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center text-blue-100 mb-4">
              <div className="flex items-center mr-6 mb-2">
                <User size={16} className="mr-2" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center mr-6 mb-2">
                <Calendar size={16} className="mr-2" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center mr-6 mb-2">
                <Clock size={16} className="mr-2" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-navy-700 text-white text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Article Content */}
          <article className="bg-white rounded-lg shadow-md p-8">
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-serif font-bold text-navy-900 mb-6 mt-8 first:mt-0">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-serif font-bold text-navy-900 mb-4 mt-8">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-serif font-bold text-navy-900 mb-3 mt-6">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-4 text-gray-700 space-y-2">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="ml-4">{children}</li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-300 pl-4 italic text-gray-600 my-6">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children, className }) => {
                    const isInline = !className;
                    if (isInline) {
                      return (
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-navy-800">
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code className={className}>
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }) => (
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
                      {children}
                    </pre>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-bold text-navy-900">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic">{children}</em>
                  ),
                  a: ({ children, href }) => (
                    <a 
                      href={href} 
                      className="text-blue-700 hover:text-navy-900 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </article>

          {/* Navigation */}
          <div className="mt-12 text-center">
            <Link to="/blog">
              <Button variant="primary" size="lg">
                Back to All Articles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;