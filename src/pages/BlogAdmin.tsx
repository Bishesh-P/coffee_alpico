import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Image, Tag, User, Clock, Edit, Trash2, Plus } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import Button from '../components/common/Button';

const BlogAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const { posts, addPost, updatePost, deletePost, getPost } = useBlog();

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    tags: '',
    featured: false,
    image: '',
    readTime: 5
  });

  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (editId) {
      const post = getPost(editId);
      if (post) {
        setFormData({
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          author: post.author,
          tags: post.tags.join(', '),
          featured: post.featured,
          image: post.image,
          readTime: post.readTime
        });
        setShowForm(true);
      }
    }
  }, [editId, getPost]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const postData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      readTime: parseInt(formData.readTime.toString()) || 5
    };

    try {
      if (editId) {
        updatePost(editId, postData);
      } else {
        addPost(postData);
      }
      
      setTimeout(() => {
        setShowForm(false);
        setFormData({
          title: '',
          excerpt: '',
          content: '',
          author: '',
          tags: '',
          featured: false,
          image: '',
          readTime: 5
        });
        navigate('/admin/blog');
      }, 1000);
    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (postId: string, postTitle: string) => {
    if (window.confirm(`Are you sure you want to delete "${postTitle}"?`)) {
      deletePost(postId);
    }
  };

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  useEffect(() => {
    if (formData.content) {
      const estimated = estimateReadTime(formData.content);
      setFormData(prev => ({ ...prev, readTime: estimated }));
    }
  }, [formData.content]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-navy-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-blue-200 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Blog
          </Link>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-serif font-bold">
              Blog Administration
            </h1>
            {!showForm && (
              <Button
                onClick={() => setShowForm(true)}
                variant="secondary"
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                New Post
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {!showForm ? (
          /* Blog Posts Management */
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-navy-900">Manage Blog Posts</h2>
                <p className="text-gray-600 mt-1">Create, edit, and delete blog posts</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Post
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Author
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img 
                              src={post.image} 
                              alt={post.title}
                              className="w-12 h-12 object-cover rounded mr-4"
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {post.title}
                              </div>
                              <div className="text-sm text-gray-500 line-clamp-1">
                                {post.excerpt}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {post.author}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(post.publishedAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            post.featured 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {post.featured ? 'Featured' : 'Published'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <Link 
                            to={`/blog/${post.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => {
                              navigate(`/admin/blog?edit=${post.id}`);
                              setShowForm(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit size={16} className="inline" />
                          </button>
                          <button
                            onClick={() => handleDelete(post.id, post.title)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={16} className="inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* Blog Post Form */
          <div className="max-w-4xl mx-auto">
            {/* Toggle Preview */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex gap-4">
                <Button
                  variant={!isPreview ? 'primary' : 'outline'}
                  onClick={() => setIsPreview(false)}
                >
                  Edit
                </Button>
                <Button
                  variant={isPreview ? 'primary' : 'outline'}
                  onClick={() => setIsPreview(true)}
                >
                  <Eye size={16} className="mr-2" />
                  Preview
                </Button>
              </div>
              
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({
                      title: '',
                      excerpt: '',
                      content: '',
                      author: '',
                      tags: '',
                      featured: false,
                      image: '',
                      readTime: 5
                    });
                    navigate('/admin/blog');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleSubmit(new Event('submit') as unknown as React.FormEvent)}
                  disabled={isSaving || !formData.title || !formData.content}
                  className="flex items-center gap-2"
                >
                  <Save size={16} />
                  {isSaving ? 'Saving...' : editId ? 'Update Post' : 'Publish Post'}
                </Button>
              </div>
            </div>

            {!isPreview ? (
              /* Edit Form */
              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your blog post title..."
                      />
                    </div>

                    <div>
                      <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                        Excerpt *
                      </label>
                      <textarea
                        id="excerpt"
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Brief description of your post..."
                      />
                    </div>

                    <div>
                      <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                        Content * (Markdown supported)
                      </label>
                      <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                        rows={20}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                        placeholder="Write your blog post content in Markdown..."
                      />
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                        <User size={16} className="inline mr-1" />
                        Author *
                      </label>
                      <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Author name"
                      />
                    </div>

                    <div>
                      <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                        <Image size={16} className="inline mr-1" />
                        Featured Image URL *
                      </label>
                      <input
                        type="url"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://example.com/image.jpg"
                      />
                      {formData.image && (
                        <div className="mt-2">
                          <img 
                            src={formData.image} 
                            alt="Preview" 
                            className="w-full h-32 object-cover rounded"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                        <Tag size={16} className="inline mr-1" />
                        Tags
                      </label>
                      <input
                        type="text"
                        id="tags"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="brewing, guide, tips (comma separated)"
                      />
                    </div>

                    <div>
                      <label htmlFor="readTime" className="block text-sm font-medium text-gray-700 mb-2">
                        <Clock size={16} className="inline mr-1" />
                        Read Time (minutes)
                      </label>
                      <input
                        type="number"
                        id="readTime"
                        name="readTime"
                        value={formData.readTime}
                        onChange={handleChange}
                        min="1"
                        max="60"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="featured"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                        Featured post
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              /* Preview */
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div 
                  className="relative py-32 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${formData.image})` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                  <div className="relative container mx-auto px-4">
                    <div className="max-w-4xl">
                      <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                        {formData.title || 'Your Blog Post Title'}
                      </h1>
                      
                      <div className="flex flex-wrap items-center text-blue-100 mb-4">
                        <div className="flex items-center mr-6 mb-2">
                          <User size={16} className="mr-2" />
                          <span>{formData.author || 'Author Name'}</span>
                        </div>
                        <div className="flex items-center mr-6 mb-2">
                          <Clock size={16} className="mr-2" />
                          <span>{formData.readTime} min read</span>
                        </div>
                      </div>
                      
                      {formData.tags && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {formData.tags.split(',').map((tag, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-navy-700 text-white text-sm rounded-full"
                            >
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {formData.excerpt || 'Your blog post excerpt will appear here...'}
                      </p>
                    </div>
                    
                    <div className="prose prose-lg max-w-none">
                      <div className="whitespace-pre-wrap text-gray-700">
                        {formData.content || 'Your blog post content will appear here...'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogAdmin;