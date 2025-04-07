'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaDumbbell, 
  FaUsers, 
  FaAppleAlt, 
  FaHeartbeat, 
  FaRunning, 
  FaWeightHanging 
} from 'react-icons/fa';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50 
  },
  visible: (index: number) => ({ 
    opacity: 1, 
    y: 0,
    transition: { 
      delay: 0.1 * index,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, index }) => {
  return (
    <motion.div
      className="service-card relative overflow-hidden rounded-2xl p-6 h-full"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      aria-labelledby={`service-title-${index}`}
    >
      <div className="relative z-10 h-full flex flex-col">
        <div className="service-icon-container mb-4 p-3 rounded-full w-16 h-16 flex items-center justify-center">
          <div className="text-3xl text-primary">{icon}</div>
        </div>
        <h3 id={`service-title-${index}`} className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

const ServicesSection: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const services = [
    {
      icon: <FaDumbbell />,
      title: "אימון אישי",
      description: "תוכנית אימונים מותאמת אישית עם מאמן מקצועי שיעזור לך להשיג את היעדים שלך."
    },
    {
      icon: <FaUsers />,
      title: "אימוני קבוצה",
      description: "מגוון רחב של שיעורים קבוצתיים כמו יוגה, ספינינג, זומבה ועוד בהדרכת מדריכים מנוסים."
    },
    {
      icon: <FaAppleAlt />,
      title: "ייעוץ תזונה",
      description: "פגישות אישיות עם תזונאים מוסמכים שיתאימו לך תפריט תזונה מאוזן לפי צרכיך."
    },
    {
      icon: <FaHeartbeat />,
      title: "בדיקות כושר",
      description: "הערכת מצב גופני מקיפה לקביעת רמת הכושר ובניית תוכנית אימונים מתאימה."
    },
    {
      icon: <FaRunning />,
      title: "אימוני סיבולת",
      description: "תוכניות מיוחדות לשיפור הסיבולת והכושר האירובי באמצעות ריצה, שחייה ורכיבה."
    },
    {
      icon: <FaWeightHanging />,
      title: "אימוני כוח",
      description: "אימונים ממוקדים לבניית שרירים וחיזוק הגוף עם מגוון ציוד מתקדם ומשקולות."
    }
  ];

  return (
    <section className="services-section py-20 px-4 md:px-8 lg:px-16 rtl" dir="rtl">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">השירותים שלנו</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            במכון כושר גמא אנו מציעים מגוון רחב של שירותים מקצועיים שיעזרו לך להשיג את יעדי הכושר והבריאות שלך.
          </p>
        </motion.div>
        
        <motion.div 
          ref={ref}
          animate={controls}
          initial="hidden"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
            />
          ))}
        </motion.div>
      </div>
      
      <style jsx>{`
        .services-section {
          background-color: var(--bg-color);
        }
        
        .service-card {
          background: var(--card-bg);
          box-shadow: var(--neumorphic-shadow);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }
        
        .service-card:hover {
          box-shadow: var(--neumorphic-shadow-hover);
        }
        
        .service-icon-container {
          background: var(--icon-bg);
          box-shadow: var(--icon-shadow);
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;