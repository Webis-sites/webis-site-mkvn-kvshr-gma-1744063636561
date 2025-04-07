'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

interface Testimonial {
  id: number;
  name: string;
  image: string;
  quote: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'דניאל כהן',
    image: '/testimonials/person1.jpg',
    quote: 'מכון כושר גמא שינה את חיי לחלוטין. הצלחתי להוריד 15 קילו בחצי שנה בזכות האימונים האישיים והליווי המקצועי.',
    role: 'מתאמן קבוע, 3 שנים'
  },
  {
    id: 2,
    name: 'מיכל לוי',
    image: '/testimonials/person2.jpg',
    quote: 'האווירה במכון מדהימה והמאמנים מקצועיים ביותר. הגעתי עם כאבי גב כרוניים וכיום אני מרגישה טוב יותר מאי פעם.',
    role: 'מתאמנת, שנתיים'
  },
  {
    id: 3,
    name: 'אלון ברק',
    image: '/testimonials/person3.jpg',
    quote: 'התוכנית האישית שבנו לי במכון כושר גמא עזרה לי להגיע להישגים שלא חלמתי עליהם. המאמנים תמיד זמינים לשאלות ועצות.',
    role: 'ספורטאי חובב'
  },
  {
    id: 4,
    name: 'שירה אברהם',
    image: '/testimonials/person4.jpg',
    quote: 'אחרי לידה חיפשתי מקום שיעזור לי לחזור לכושר. מכון כושר גמא היה הבחירה המושלמת - יחס אישי, מקצועיות ואווירה תומכת.',
    role: 'אמא טרייה'
  },
  {
    id: 5,
    name: 'יוסי מזרחי',
    image: '/testimonials/person5.jpg',
    quote: 'בגיל 65 לא האמנתי שאוכל להשתפר, אבל המאמנים במכון כושר גמא הוכיחו לי שאף פעם לא מאוחר. הכושר שלי השתפר פלאים.',
    role: 'גמלאי פעיל'
  },
  {
    id: 6,
    name: 'נועה שלום',
    image: '/testimonials/person6.jpg',
    quote: 'האימונים הקבוצתיים במכון הם חוויה מדהימה. האנרגיה, המוזיקה והאנשים - הכל גורם לך לרצות להתאמן יותר ויותר.',
    role: 'מתאמנת בקבוצות'
  }
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Calculate how many testimonials to show based on screen width
  const getItemsToShow = () => {
    if (width < 640) return 1;
    if (width < 1024) return 2;
    return 3;
  };

  const itemsToShow = getItemsToShow();
  const totalSlides = testimonials.length - itemsToShow + 1;

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Set initial width
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [currentIndex, autoplay]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleMouseEnter = () => {
    setAutoplay(false);
  };

  const handleMouseLeave = () => {
    setAutoplay(true);
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsToShow);

  return (
    <section 
      className="py-16 px-4 bg-gradient-to-br from-secondary-100 to-primary-100 relative overflow-hidden"
      dir="rtl"
    >
      {/* Glassmorphism background elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary-300 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/3 w-80 h-80 rounded-full bg-secondary-300 opacity-20 blur-3xl"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">הסיפורים שלנו</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            מה המתאמנים שלנו אומרים על החוויה במכון כושר גמא
          </p>
        </motion.div>

        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={carouselRef}
        >
          {/* Carousel Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 glassmorphism-button"
            aria-label="הקודם"
          >
            <FaChevronRight className="text-xl" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 glassmorphism-button"
            aria-label="הבא"
          >
            <FaChevronLeft className="text-xl" />
          </button>

          {/* Testimonials Carousel */}
          <div className="overflow-hidden px-8">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex gap-6"
              >
                {visibleTestimonials.map((testimonial) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 min-w-0"
                  >
                    <div className="neumorphic-card">
                      <div className="glassmorphism-content">
                        <div className="mb-6 relative w-20 h-20 mx-auto">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="rounded-full object-cover border-2 border-primary-300"
                          />
                        </div>
                        <blockquote className="mb-4 text-gray-700">
                          <p className="text-lg leading-relaxed">"{testimonial.quote}"</p>
                        </blockquote>
                        <div className="text-center">
                          <h4 className="font-bold text-xl text-gray-800">{testimonial.name}</h4>
                          <p className="text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-primary-500 w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`עבור לעדות ${index + 1}`}
                aria-current={currentIndex === index ? 'true' : 'false'}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;