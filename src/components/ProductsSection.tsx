'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaDumbbell, FaShoppingBag, FaTshirt, FaVial } from 'react-icons/fa';

// Define product type
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'equipment' | 'supplements' | 'apparel' | 'accessories';
}

// Define category type
interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const ProductsSection: React.FC = () => {
  // Sample product data
  const products: Product[] = [
    {
      id: '1',
      name: 'משקולות יד מקצועיות',
      description: 'סט משקולות יד איכותיות במשקלים שונים',
      price: 299,
      image: '/images/products/dumbbells.jpg',
      category: 'equipment'
    },
    {
      id: '2',
      name: 'אבקת חלבון פרימיום',
      description: 'אבקת חלבון איכותית בטעם וניל - 1 ק"ג',
      price: 189,
      image: '/images/products/protein.jpg',
      category: 'supplements'
    },
    {
      id: '3',
      name: 'חולצת אימון דרייפיט',
      description: 'חולצת אימון נושמת עם לוגו המכון',
      price: 89,
      image: '/images/products/tshirt.jpg',
      category: 'apparel'
    },
    {
      id: '4',
      name: 'מזרן יוגה מקצועי',
      description: 'מזרן יוגה באיכות גבוהה עם אחיזה מעולה',
      price: 129,
      image: '/images/products/yoga-mat.jpg',
      category: 'equipment'
    },
    {
      id: '5',
      name: 'קרטין מונוהידראט',
      description: 'תוסף קרטין לשיפור ביצועים וכוח - 300 גרם',
      price: 149,
      image: '/images/products/creatine.jpg',
      category: 'supplements'
    },
    {
      id: '6',
      name: 'מכנסי אימון קצרים',
      description: 'מכנסי אימון קצרים ונוחים לפעילות אינטנסיבית',
      price: 119,
      image: '/images/products/shorts.jpg',
      category: 'apparel'
    },
    {
      id: '7',
      name: 'בקבוק שייקר',
      description: 'בקבוק שייקר 700 מ"ל עם כדור ערבוב',
      price: 49,
      image: '/images/products/shaker.jpg',
      category: 'accessories'
    },
    {
      id: '8',
      name: 'כפפות אימון',
      description: 'כפפות אימון מקצועיות למניעת יבלות',
      price: 79,
      image: '/images/products/gloves.jpg',
      category: 'accessories'
    }
  ];

  // Categories
  const categories: Category[] = [
    { id: 'all', name: 'הכל', icon: <FaShoppingBag /> },
    { id: 'equipment', name: 'ציוד', icon: <FaDumbbell /> },
    { id: 'supplements', name: 'תוספי תזונה', icon: <FaVial /> },
    { id: 'apparel', name: 'ביגוד', icon: <FaTshirt /> },
    { id: 'accessories', name: 'אביזרים', icon: <FaShoppingBag /> }
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Filter products based on selected category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
    setCurrentSlide(0);
  }, [selectedCategory]);

  // Handle carousel navigation
  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNext = () => {
    const maxSlide = Math.max(0, filteredProducts.length - getVisibleItems());
    if (currentSlide < maxSlide) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  // Get number of visible items based on screen size
  const getVisibleItems = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }
    return 3; // Default for SSR
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Format price to ILS
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-16 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-gray-100 rtl"
      dir="rtl"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            <span className="text-primary">מוצרי</span> המכון
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            מגוון רחב של מוצרים איכותיים לאימון מקצועי - ציוד, תוספי תזונה, ביגוד ואביזרים נלווים
          </p>
        </motion.div>

        {/* Categories */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  flex items-center gap-2 px-5 py-3 rounded-full 
                  transition-all duration-300
                  ${selectedCategory === category.id 
                    ? 'bg-primary text-white shadow-neumorphic-pressed' 
                    : 'bg-white/80 text-gray-700 shadow-neumorphic hover:shadow-neumorphic-hover backdrop-blur-sm border border-white/20'}
                `}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Carousel */}
        <div className="relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="overflow-hidden"
            ref={carouselRef}
          >
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ 
                transform: `translateX(${currentSlide * (100 / getVisibleItems())}%)`,
                direction: 'ltr' // Fix RTL carousel direction
              }}
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  className={`flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-4`}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="h-full bg-white/70 backdrop-blur-md rounded-2xl overflow-hidden 
                                shadow-glassmorphic border border-white/30
                                transition-all duration-300 hover:shadow-glassmorphic-hover">
                    <div className="relative h-64 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-secondary/20 z-10"></div>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-primary">{formatPrice(product.price)}</span>
                        <button 
                          className="bg-primary text-white px-4 py-2 rounded-lg 
                                    shadow-neumorphic-small hover:shadow-neumorphic-small-hover 
                                    active:shadow-neumorphic-pressed transition-all duration-300"
                        >
                          הוסף לסל
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          {filteredProducts.length > getVisibleItems() && (
            <>
              <button
                onClick={handlePrev}
                disabled={currentSlide === 0}
                className={`absolute top-1/2 right-2 transform -translate-y-1/2 z-10
                          bg-white/80 backdrop-blur-sm p-3 rounded-full
                          shadow-neumorphic hover:shadow-neumorphic-hover 
                          active:shadow-neumorphic-pressed
                          transition-all duration-300
                          ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
                aria-label="הקודם"
              >
                <FiChevronRight className="text-primary text-xl" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentSlide >= filteredProducts.length - getVisibleItems()}
                className={`absolute top-1/2 left-2 transform -translate-y-1/2 z-10
                          bg-white/80 backdrop-blur-sm p-3 rounded-full
                          shadow-neumorphic hover:shadow-neumorphic-hover 
                          active:shadow-neumorphic-pressed
                          transition-all duration-300
                          ${currentSlide >= filteredProducts.length - getVisibleItems() ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
                aria-label="הבא"
              >
                <FiChevronLeft className="text-primary text-xl" />
              </button>
            </>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-primary to-secondary text-white
                     px-8 py-3 rounded-full text-lg font-medium
                     shadow-neumorphic hover:shadow-neumorphic-hover 
                     active:shadow-neumorphic-pressed
                     transition-all duration-300"
          >
            לצפייה בכל המוצרים
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;