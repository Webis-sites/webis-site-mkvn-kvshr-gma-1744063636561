'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaDumbbell, FaTabletAlt, FaUsers, FaHeartbeat, FaWifi, FaLock } from 'react-icons/fa';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, delay }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: delay * 0.2 } }
      }}
      className="neumorphic-card glassmorphism-card"
      aria-labelledby={`feature-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <div className="feature-icon-container">
        {icon}
      </div>
      <h3 
        id={`feature-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className="text-xl font-bold mb-2 text-primary"
      >
        {title}
      </h3>
      <p className="text-gray-700">{description}</p>
    </motion.div>
  );
};

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <FaDumbbell size={32} />,
      title: "ציוד חכם מתקדם",
      description: "מכשירי כושר חכמים המתחברים לאפליקציה ועוקבים אחר הביצועים שלך בזמן אמת"
    },
    {
      icon: <FaTabletAlt size={32} />,
      title: "מעקב התקדמות דיגיטלי",
      description: "מערכת מעקב אישית המציגה את ההתקדמות שלך, מטרות ותוכניות אימון מותאמות אישית"
    },
    {
      icon: <FaUsers size={32} />,
      title: "אזורי אימון מיוחדים",
      description: "אזורים ייעודיים לאימוני כוח, קרוספיט, יוגה ופילאטיס עם מדריכים מקצועיים"
    },
    {
      icon: <FaHeartbeat size={32} />,
      title: "ניטור בריאות",
      description: "מערכות ניטור דופק ובריאות משולבות בכל מכשיר לאימון בטוח ואפקטיבי"
    },
    {
      icon: <FaWifi size={32} />,
      title: "קישוריות מלאה",
      description: "חיבור Wi-Fi מהיר בכל המתחם המאפשר סנכרון מיידי של נתוני האימון שלך"
    },
    {
      icon: <FaLock size={32} />,
      title: "גישה 24/7",
      description: "גישה למכון בכל שעות היממה באמצעות מערכת כניסה חכמה ומאובטחת"
    }
  ];

  return (
    <section className="features-section py-16 px-4 md:px-8 lg:px-16 rtl" dir="rtl">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">היתרונות שלנו</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            במכון כושר גמא אנו מציעים את הטכנולוגיה המתקדמת ביותר לחוויית אימון מושלמת
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;