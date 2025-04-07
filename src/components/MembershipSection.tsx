'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes, FaDumbbell, FaRunning, FaHeartbeat, FaUserFriends } from 'react-icons/fa';

interface MembershipPlan {
  id: number;
  name: string;
  price: number;
  period: string;
  features: {
    text: string;
    included: boolean;
  }[];
  isPopular: boolean;
  icon: React.ReactNode;
}

const MembershipSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const plans: MembershipPlan[] = [
    {
      id: 1,
      name: 'בסיסי',
      price: 99,
      period: 'לחודש',
      features: [
        { text: 'גישה בסיסית למכשירים', included: true },
        { text: 'שעות פעילות מוגבלות', included: true },
        { text: 'אימון אישי חודשי', included: false },
        { text: 'כניסה לחוגים', included: false },
        { text: 'שימוש בסאונה וג׳קוזי', included: false },
      ],
      isPopular: false,
      icon: <FaDumbbell />
    },
    {
      id: 2,
      name: 'סטנדרט',
      price: 149,
      period: 'לחודש',
      features: [
        { text: 'גישה מלאה למכשירים', included: true },
        { text: 'שעות פעילות מורחבות', included: true },
        { text: 'אימון אישי חודשי', included: true },
        { text: 'כניסה לחוגים', included: true },
        { text: 'שימוש בסאונה וג׳קוזי', included: false },
      ],
      isPopular: true,
      icon: <FaRunning />
    },
    {
      id: 3,
      name: 'פרימיום',
      price: 199,
      period: 'לחודש',
      features: [
        { text: 'גישה מלאה למכשירים 24/7', included: true },
        { text: 'שעות פעילות ללא הגבלה', included: true },
        { text: 'שני אימונים אישיים חודשיים', included: true },
        { text: 'כניסה לכל החוגים', included: true },
        { text: 'שימוש בסאונה וג׳קוזי', included: true },
      ],
      isPopular: false,
      icon: <FaHeartbeat />
    },
    {
      id: 4,
      name: 'משפחתי',
      price: 299,
      period: 'לחודש',
      features: [
        { text: 'גישה מלאה למכשירים לכל המשפחה', included: true },
        { text: 'שעות פעילות ללא הגבלה', included: true },
        { text: 'אימון אישי חודשי לכל בן משפחה', included: true },
        { text: 'כניסה לכל החוגים', included: true },
        { text: 'שימוש בסאונה וג׳קוזי', included: true },
      ],
      isPopular: false,
      icon: <FaUserFriends />
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <section dir="rtl" className="relative py-16 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Background Decoration */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">חבילות מנוי</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            בחרו את חבילת המנוי המתאימה לכם ותתחילו את המסע לכושר מושלם
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`
                relative rounded-2xl overflow-hidden
                ${plan.isPopular ? 'ring-2 ring-primary' : 'ring-1 ring-gray-200 dark:ring-gray-700'}
                bg-white dark:bg-gray-800 
                backdrop-filter backdrop-blur-lg bg-opacity-70 dark:bg-opacity-40
                transition-all duration-300
                neumorphic-card glass-card
              `}
              custom={index}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={cardVariants}
              whileHover="hover"
              aria-label={`חבילת ${plan.name}`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg text-sm font-medium z-10">
                  פופולרי
                </div>
              )}
              
              <div className="p-6 flex flex-col h-full">
                <div className="mb-6 flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-primary bg-opacity-10 text-primary">
                  <span className="text-2xl">{plan.icon}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-center mb-2 text-gray-800 dark:text-white">{plan.name}</h3>
                
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-gray-800 dark:text-white">₪{plan.price}</span>
                  <span className="text-gray-500 dark:text-gray-400">/{plan.period}</span>
                </div>
                
                <ul className="mb-8 space-y-3 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className={`flex-shrink-0 w-5 h-5 mr-2 rounded-full flex items-center justify-center ${feature.included ? 'text-green-500' : 'text-red-500'}`}>
                        {feature.included ? <FaCheck size={12} /> : <FaTimes size={12} />}
                      </span>
                      <span className={`text-sm ${feature.included ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <motion.button
                  className={`
                    w-full py-3 px-4 rounded-xl font-medium text-center transition-all
                    ${plan.isPopular 
                      ? 'bg-primary text-white hover:bg-primary-dark' 
                      : 'bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'}
                    neumorphic-button
                  `}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`הרשמה לחבילת ${plan.name}`}
                >
                  הרשמה עכשיו
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            יש לכם שאלות? <a href="#contact" className="text-primary hover:underline">צרו קשר</a> ונשמח לעזור
          </p>
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;