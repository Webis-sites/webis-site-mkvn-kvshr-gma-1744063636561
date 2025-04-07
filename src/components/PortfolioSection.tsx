'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMaximize2, FiFilter } from 'react-icons/fi';
import { useMediaQuery } from 'react-responsive';

// Types
interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: 'facilities' | 'trainers' | 'transformations';
  imageUrl: string;
}

// Sample data - replace with your actual data
const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'אולם משקולות חופשיות',
    description: 'אולם משקולות חופשיות מאובזר במיטב הציוד המקצועי',
    category: 'facilities',
    imageUrl: '/images/gym-weights-room.jpg',
  },
  {
    id: '2',
    title: 'חדר כושר קרדיו',
    description: 'מגוון מכשירי קרדיו מהמתקדמים ביותר',
    category: 'facilities',
    imageUrl: '/images/gym-cardio.jpg',
  },
  {
    id: '3',
    title: 'אזור אימון פונקציונלי',
    description: 'אזור אימון פונקציונלי עם מגוון אביזרים',
    category: 'facilities',
    imageUrl: '/images/gym-functional.jpg',
  },
  {
    id: '4',
    title: 'יוסי כהן - מאמן אישי',
    description: '10 שנות ניסיון באימון אישי והכנה לתחרויות',
    category: 'trainers',
    imageUrl: '/images/trainer-male.jpg',
  },
  {
    id: '5',
    title: 'מיכל לוי - מאמנת אישית',
    description: 'מומחית לאימוני HIIT ואימוני נשים',
    category: 'trainers',
    imageUrl: '/images/trainer-female.jpg',
  },
  {
    id: '6',
    title: 'דני - לפני ואחרי',
    description: 'ירידה של 15 ק"ג ב-6 חודשים',
    category: 'transformations',
    imageUrl: '/images/transformation-1.jpg',
  },
  {
    id: '7',
    title: 'רונית - לפני ואחרי',
    description: 'חיזוק והגדלת מסת שריר',
    category: 'transformations',
    imageUrl: '/images/transformation-2.jpg',
  },
  {
    id: '8',
    title: 'אולם יוגה ופילאטיס',
    description: 'אולם מרווח לשיעורי יוגה ופילאטיס',
    category: 'facilities',
    imageUrl: '/images/gym-yoga.jpg',
  },
];

const PortfolioSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const filterMenuRef = useRef<HTMLDivElement>(null);

  // Filter items based on selected category
  const filteredItems = selectedCategory
    ? portfolioItems.filter((item) => item.category === selectedCategory)
    : portfolioItems;

  // Close filter menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target as Node)
      ) {
        setIsFilterMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle opening the lightbox
  const openLightbox = (item: PortfolioItem) => {
    setSelectedItem(item);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Handle closing the lightbox
  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Categories for filter
  const categories = [
    { id: 'facilities', label: 'מתקנים' },
    { id: 'trainers', label: 'מאמנים' },
    { id: 'transformations', label: 'טרנספורמציות' },
  ];

  return (
    <section className="portfolio-section py-16 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rtl">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            הגלריה שלנו
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            צפו במתקנים המתקדמים, במאמנים המקצועיים ובתוצאות המרשימות של המתאמנים שלנו
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex justify-center mb-8 relative">
          {isMobile ? (
            <div className="relative" ref={filterMenuRef}>
              <button
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                className="neumorphic-button flex items-center gap-2 px-6 py-3 rounded-full text-gray-700 dark:text-white"
              >
                <FiFilter />
                <span>סינון</span>
              </button>

              {isFilterMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="glassmorphism absolute top-full mt-2 right-0 z-10 rounded-xl p-2 w-48"
                >
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setIsFilterMenuOpen(false);
                    }}
                    className={`w-full text-right px-4 py-2 rounded-lg mb-1 transition-all ${
                      selectedCategory === null
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    הכל
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setIsFilterMenuOpen(false);
                      }}
                      className={`w-full text-right px-4 py-2 rounded-lg mb-1 transition-all ${
                        selectedCategory === category.id
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          ) : (
            <div className="glassmorphism flex gap-2 p-2 rounded-full">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`neumorphic-button px-6 py-2 rounded-full transition-all ${
                  selectedCategory === null
                    ? 'neumorphic-button-active'
                    : ''
                }`}
              >
                הכל
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`neumorphic-button px-6 py-2 rounded-full transition-all ${
                    selectedCategory === category.id
                      ? 'neumorphic-button-active'
                      : ''
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glassmorphism rounded-xl overflow-hidden group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <button
                      onClick={() => openLightbox(item)}
                      className="m-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white"
                      aria-label="הגדל תמונה"
                    >
                      <FiMaximize2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                  <div className="mt-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-secondary/20 text-secondary">
                      {
                        categories.find(
                          (category) => category.id === item.category
                        )?.label
                      }
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full h-auto max-h-[80vh] rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[70vh]">
                <Image
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="absolute top-4 right-4">
                <button
                  onClick={closeLightbox}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  aria-label="סגור"
                >
                  <FiX size={24} />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                <h3 className="text-xl font-bold">{selectedItem.title}</h3>
                <p className="text-gray-300">{selectedItem.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;