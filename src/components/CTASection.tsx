'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface CTASectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  backgroundImage?: string;
}

const CTASection: React.FC<CTASectionProps> = ({
  title = 'הצטרף למשפחת גמא פיטנס',
  description = 'מכון כושר מתקדם עם מאמנים מקצועיים, ציוד חדשני ואווירה תומכת. אימון ראשון חינם!',
  buttonText = 'קבע תור עכשיו',
  backgroundImage = '/images/gym-background.jpg',
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      className="relative overflow-hidden min-h-[500px] flex items-center justify-center py-16 px-4 md:px-8"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <Image
          src={backgroundImage}
          alt="רקע מכון כושר"
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-20"
        />
      </motion.div>

      {/* Background Overlay with Neumorphic Effect */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/30 to-secondary/30 backdrop-blur-sm"></div>

      {/* Content Container with Glassmorphism */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 
                    border border-white/20 shadow-glassmorphic
                    text-center"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white drop-shadow-md"
          >
            {title}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(150, 206, 180, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
              className="neumorphic-button bg-secondary text-white font-bold py-4 px-8 md:py-5 md:px-10 
                        rounded-full text-lg md:text-xl shadow-neumorphic
                        transition-all duration-300 hover:bg-secondary/90 focus:outline-none focus:ring-2 
                        focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary/30"
              aria-label={buttonText}
            >
              {buttonText}
            </motion.button>
          </motion.div>
          
          {/* Decorative Elements */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;