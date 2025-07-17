import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Award, Leaf } from 'lucide-react';
import Button from '../common/Button';

const CompanyIntro: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-6">
              Crafting Excellence in Every Bean
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              At Alpico Coffee, we're dedicated to the art and science of exceptional coffee. For over a decade, we've sourced beans from the world's finest growing regions, building direct relationships with farmers who share our passion for quality and sustainability.
            </p>
            <p className="text-gray-700 mb-8 leading-relaxed">
              We export premium Nepali coffee tailored to your specific demands from green beans to roasted blends. Our team carefully sources, processes, and packs each order to meet your preferred quality, quantity, and roast profile. For further details, please visit our <Link to="/contact" className="text-blue-600 hover:underline">Contact us</Link> page. Send us an enquiry and we will get back to you as soon as possible.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-3">
                  <Coffee className="text-navy-700" size={24} />
                </div>
                <h3 className="font-bold text-navy-900">Small Batch Roasted</h3>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-3">
                  <Award className="text-navy-700" size={24} />
                </div>
                <h3 className="font-bold text-navy-900">High Quality</h3>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-3">
                  <Leaf className="text-navy-700" size={24} />
                </div>
                <h3 className="font-bold text-navy-900">Sustainably Sourced</h3>
              </div>
            </div>

            <Link to="/about">
              <Button variant="outline">
                Learn More About Us
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-6">
              <img 
                src="https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Coffee beans being roasted" 
                className="rounded-lg w-full aspect-[4/3] object-cover shadow-md"
                style={{ minHeight: '180px', maxHeight: '260px' }}
                loading="lazy"
              />
              <img 
                src="https://images.pexels.com/photos/3840447/pexels-photo-3840447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"  
                alt="Container loaded in the ship" 
                className="rounded-lg w-full aspect-[4/3] object-cover shadow-md"
                style={{ minHeight: '180px', maxHeight: '260px' }}
                loading="lazy"
              />
            </div>
            <div className="flex flex-col gap-6 pt-8">
              <img 
                src="https://images.pexels.com/photos/585753/pexels-photo-585753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Coffee cupping session" 
                className="rounded-lg w-full aspect-[16/9] object-cover shadow-md"
                style={{ minHeight: '120px', maxHeight: '200px' }}
                loading="lazy"
              />
              <img 
                src="https://images.pexels.com/photos/19926887/pexels-photo-19926887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Container ship in harbor" 
                className="rounded-lg w-full aspect-[16/9] object-cover shadow-md"
                style={{ minHeight: '120px', maxHeight: '200px' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyIntro;