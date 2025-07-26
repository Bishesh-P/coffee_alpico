import React, { useState } from 'react';
import { supabase } from '../supabase-client';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import SEOHead from '../components/common/SEOHead';
import { seoConfig } from '../config/seo';
import { localBusinessSchema, generateBreadcrumbSchema } from '../utils/structuredData';
import Button from '../components/common/Button';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase.from('contact_us').insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }
      ]);
      
      if (error) throw error;
      
      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => {
        setFormSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' }
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [localBusinessSchema, breadcrumbSchema]
  };

  return (
    <div className="pt-20 md:pt-16">
      <SEOHead
        title={seoConfig.pages.contact.title}
        description={seoConfig.pages.contact.description}
        keywords={seoConfig.pages.contact.keywords}
        url="/contact"
        structuredData={combinedSchema}
      />
      
      {/* Hero Section */}
      <div 
        className="relative py-20 md:py-28 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
            Contact Nepal's Best Coffee Roaster
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            We'd love to hear from you. Reach out with questions about our premium Nepal coffee, wholesale inquiries, coffee export services, or feedback about your coffee experience.
          </p>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-navy-900 mb-6">
                Get In Touch
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <MapPin className="text-navy-700" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-800 mb-1">Visit Us</h3>
                    <address className="not-italic text-gray-700">
                      Madhyapur Thimi<br />
                      Bhaktapur 44800, Bagmati<br />
                      Nepal
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Phone className="text-navy-700" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-800 mb-1">Call Us</h3>
                    <p className="text-gray-700">
                      <a href="tel:+977-9869062187" className="hover:text-blue-700">
                        +977-9869-062-187
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Mail className="text-navy-700" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-800 mb-1">Email Us</h3>
                    <p className="text-gray-700">
                      <a href="mailto:alpicocoffeecompany@gmail.com" className="hover:text-blue-700">
                        alpicocoffeecompany@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Clock className="text-navy-700" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-800 mb-1">Hours</h3>
                    <div className="text-gray-700">
                      <p>Monday - Friday: 8am - 6pm</p>
                      <p>Saturday: Closed</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map (In a real app, this would be an interactive map) */}
              <div className="mt-8 bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <p className="text-gray-600">*Interactive Map </p>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-serif font-bold text-navy-900 mb-6">
                  Send Us a Message
                </h2>
                
                {formSubmitted ? (
                  <div className="bg-green-100 text-green-700 p-4 rounded mb-6">
                    <p className="font-medium">Thank you for your message!</p>
                    <p>We'll get back to you as soon as possible.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name*
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Email*
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject*
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Customer Support</option>
                        <option value="wholesale">Wholesale Information</option>
                        <option value="feedback">Feedback</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Message*
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full p-3 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      ></textarea>
                    </div>
                    
                    <Button type="submit" variant="primary" size="lg">
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-navy-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-navy-900 text-lg mb-2">
                Do you offer wholesale pricing for cafes and restaurants?
              </h3>
              <p className="text-gray-700">
                Yes, we offer wholesale pricing and custom blends for cafes, restaurants, and offices. Please contact our wholesale team at <a href="mailto:alpicocoffeecompany@gmail.com" className="font-bold text-navy-700">alpicocoffeecompany@gmail.com</a> for more information. If you are from Nepal, you can also reach us at <a href="tel:+977-9869062187" className="font-bold text-navy-700">+977-9869-062-187</a>.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-navy-900 text-lg mb-2">
                How soon after roasting do you deliver your coffee(in Nepal)?
              </h3>
              <p className="text-gray-700">
                We ship all orders within 24-48 hours of roasting to ensure you receive the freshest coffee possible. This means your coffee arrives at peak flavor.
              </p>
            </div>
            {/* Question Change about export */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-navy-900 text-lg mb-2">
                Does Alpico coffee export to other countries?
              </h3>
              <p className="text-gray-700">
                Yes, Alpico Coffee exports to over a dozen countries worldwide. We are committed to sharing the unique flavors of Nepali coffee with coffee lovers everywhere. Alpico actively exports premium-grade roasted and green coffee beans to international markets.
              </p>
            </div>
            {/* contact for Export */}
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-navy-900 text-lg mb-2">
                How can I contact Alpico Coffee for export inquiries?
              </h3>
              <p className="text-gray-700">
                For export inquiries, please reach out to us via email at <a href="mailto:alpicocoffeecompany@gmail.com" className="font-bold text-navy-700">alpicocoffeecompany@gmail.com</a> or call us at <a href="tel:+977-9869062187" className="font-bold text-navy-700">+977-9869-062-187</a>. Our team will be happy to assist you with all your export needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;