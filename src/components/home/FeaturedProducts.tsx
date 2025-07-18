// import React from 'react';
// import { Link } from 'react-router-dom';
// import { products } from '../../data/products';
// import { ArrowRight } from 'lucide-react';
// import { useCart } from '../../context/CartContext';
// import Button from '../common/Button';

// const FeaturedProducts: React.FC = () => {
//   const { addToCart } = useCart();
//   const featuredProducts = products.filter(product => product.featured).slice(0, 3);

//   return (
//     <section className="bg-blue-50 py-16">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-4">
//             Our Featured Coffees
//           </h2>
//           <p className="text-blue-800 max-w-2xl mx-auto">
//             Discover our most popular and exceptional coffee selections, hand-picked for their unique flavor profiles and quality.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {featuredProducts.map((product) => {
//             const [isHovered, setIsHovered] = React.useState(false);
            
//             return (
//               <div 
//                 key={product.id}
//                 className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-[1.02]"
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//               >
//                 <Link to={`/products/${product.id}`}>
//                   <div className="h-64 overflow-hidden">
//                     <img 
//                       src={product.image} 
//                       alt={product.name}
//                       className={`w-full h-full object-cover transform transition-all duration-700 ${
//                         isHovered ? 'scale-110 filter-none' : 'scale-100 filter grayscale'
//                       }`}
//                     />
//                   </div>
//                 </Link>
//                 <div className="p-6">
//                   <div className="mb-4">
//                     <Link to={`/products/${product.id}`}>
//                       <h3 className="text-xl font-bold text-navy-900 hover:text-blue-700 transition-colors">
//                         {product.name}
//                       </h3>
//                     </Link>
//                     <p className="text-blue-800 font-medium mt-1">NPR {product.price.toFixed(2)}</p>
//                   </div>
//                   <p className="text-gray-600 mb-4 text-sm line-clamp-2">
//                     {product.description}
//                   </p>
//                   <div className="flex justify-between items-center">
//                     <Button 
//                       onClick={() => addToCart(product)}
//                       variant="primary"
//                     >
//                       Add to Cart
//                     </Button>
//                     <Link 
//                       to={`/products/${product.id}`}
//                       className="text-blue-700 hover:text-navy-900 flex items-center transition-colors"
//                     >
//                       Details <ArrowRight size={16} className="ml-1" />
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <div className="text-center mt-12">
//           <Link to="/products">
//             <Button variant="secondary" size="lg">
//               View All Products
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedProducts;



//Extra code to shuffle the featured products
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Button from '../common/Button';

// Shuffle function
function shuffleArray<T>(array: T[]): T[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

const FeaturedProducts: React.FC = () => {
  const { addToCart } = useCart();

  // State for shuffled products and hovered product
  const [featuredProducts, setFeaturedProducts] = useState(
    shuffleArray(products.filter(product => product.featured)).slice(0, 3)
  );
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);

  // Timer to reshuffle every 10-20 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedProducts((prevProducts) => {
        // Exclude hovered product
        const remainingProducts = products
          .filter(product => product.featured && product.id !== hoveredProductId);
        const shuffled = shuffleArray(remainingProducts);

        // Keep hovered product in place
        const result = prevProducts.map((prod) =>
          prod.id === hoveredProductId ? prod : shuffled.pop()!
        );

        return result;
      });
    }, Math.random() * (20000 - 10000) + 10000); // random between 10–20 sec

    return () => clearInterval(interval);
  }, [hoveredProductId]);

  return (
    <section className="bg-blue-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mb-4">
            Our Featured Coffees
          </h2>
          <p className="text-blue-800 max-w-2xl mx-auto">
            Discover our most popular and exceptional coffee selections, hand-picked for their unique flavor profiles and quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-[1.02]"
              onMouseEnter={() => setHoveredProductId(product.id)}
              onMouseLeave={() => setHoveredProductId(null)}
            >
              <Link to={`/products/${product.id}`}>
                <div className="h-64 overflow-hidden group">
                  <img
                    src={product.image.replace('dpr=2', 'w=600')}
                    srcSet={`
                      ${product.image.replace('dpr=2', 'w=400')} 400w,
                      ${product.image.replace('dpr=2', 'w=800')} 800w,
                      ${product.image.replace('dpr=2', 'w=1200')} 1200w
                    `}
                    sizes="(max-width: 600px) 400px, (max-width: 900px) 800px, 1200px"
                    alt={product.name}
                    className="w-full h-full object-cover transform transition-all duration-700 grayscale group-hover:scale-110 group-hover:grayscale-0"
                    loading="lazy"
                  />
                </div>
              </Link>
              <div className="p-6">
                <div className="mb-4">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="text-xl font-bold text-navy-900 hover:text-blue-700 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-blue-800 font-medium mt-1">NPR {product.price.toFixed(2)}</p>
                </div>
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <Button onClick={() => addToCart(product)} variant="primary">
                    Add to Cart
                  </Button>
                  <Link
                    to={`/products/${product.id}`}
                    className="text-blue-700 hover:text-navy-900 flex items-center transition-colors"
                  >
                    Details <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/products">
            <Button variant="secondary" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

