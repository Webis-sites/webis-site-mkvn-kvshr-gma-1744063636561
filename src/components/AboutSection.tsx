'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FaDumbbell, FaUsers, FaStar, FaHeartbeat } from 'react-icons/fa';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
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
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      className="neumorphic-card glassmorphism-card relative p-6 rounded-xl h-full"
    >
      <div className="text-primary text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const AboutSection: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const features = [
    {
      icon: <FaDumbbell />,
      title: "ציוד מתקדם",
      description: "מכון הכושר שלנו מצויד בציוד החדיש והמתקדם ביותר בשוק, המותאם לכל רמות הכושר."
    },
    {
      icon: <FaUsers />,
      title: "מאמנים מקצועיים",
      description: "הצוות שלנו מורכב ממאמנים מוסמכים בעלי ניסיון רב שיעזרו לך להשיג את המטרות שלך."
    },
    {
      icon: <FaStar />,
      title: "תוכניות מותאמות אישית",
      description: "אנו מציעים תוכניות אימון מותאמות אישית המתאימות לצרכים ולמטרות הספציפיים שלך."
    },
    {
      icon: <FaHeartbeat />,
      title: "אווירה תומכת",
      description: "אנו מטפחים סביבה חיובית ותומכת שבה כל אחד מרגיש בנוח ומקבל עידוד להצליח."
    }
  ];

  return (
    <section dir="rtl" className="py-16 px-4 md:px-8 lg:px-16 bg-light overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { 
                staggerChildren: 0.2,
                delayChildren: 0.3
              }
            }
          }}
          className="text-center mb-12"
        >
          <motion.h2 
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
          >
            אודות מכון כושר גמא
          </motion.h2>
          
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
            className="glassmorphism-card neumorphic-card max-w-3xl mx-auto p-8 rounded-xl mb-12"
          >
            <p className="text-lg text-gray-700 leading-relaxed">
              אנחנו מכון כושר מוביל בתחום הטכנולוגיה עם ניסיון של שנים רבות. אנחנו מתמחים במתן שירות מקצועי ואיכותי ללקוחותינו.
            </p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <button className="neumorphic-button glassmorphism-button px-8 py-3 rounded-full font-bold text-gray-800 transition-all duration-300 hover:scale-105">
            הצטרפו אלינו עוד היום
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;