'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX } from 'react-icons/fi';

interface NavItem {
  name: string;
  href: string;
}

const NavigationBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems: NavItem[] = [
    { name: 'דף הבית', href: '/' },
    { name: 'אודות', href: '/about' },
    { name: 'שירותים', href: '/services' },
    { name: 'מוצרים', href: '/products' },
    { name: 'גלריה', href: '/gallery' },
    { name: 'צור קשר', href: '/contact' },
    { name: 'מנויים', href: '/memberships' },
    { name: 'מאמנים', href: '/trainers' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 50 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <header 
      className={`sticky top-0 w-full z-50 transition-all duration-300 dir-rtl ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-neumorphic-down' 
          : 'bg-white/60 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-12 w-40 neumorphic-logo">
              <Image
                src="/logo.png"
                alt="מכון כושר גמא"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 mx-1 text-gray-800 font-medium rounded-lg transition-all duration-300 hover:bg-primary/10 hover:text-primary relative overflow-hidden neumorphic-button"
              >
                <span className="relative z-10">{item.name}</span>
              </Link>
            ))}
            <Link
              href="/signup"
              className="glassmorphism-button ml-2 px-6 py-2 rounded-lg font-bold text-white bg-gradient-to-l from-secondary to-primary transition-all duration-300 hover:shadow-lg"
            >
              הרשמה
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-3 rounded-full neumorphic-button-circle focus:outline-none"
              aria-expanded={isOpen}
              aria-label={isOpen ? "סגור תפריט" : "פתח תפריט"}
            >
              {isOpen ? (
                <FiX className="h-6 w-6 text-gray-800" />
              ) : (
                <FiMenu className="h-6 w-6 text-gray-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 top-20 bg-white/90 backdrop-blur-lg md:hidden z-40 glassmorphism-panel"
          >
            <div className="flex flex-col h-full p-5 overflow-y-auto">
              <nav className="flex flex-col space-y-4 mt-5">
                {navItems.map((item) => (
                  <motion.div key={item.name} variants={itemVariants}>
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-lg text-gray-800 font-medium rounded-lg transition-all duration-300 hover:bg-primary/10 neumorphic-button-flat"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div variants={itemVariants}>
                  <Link
                    href="/signup"
                    className="block mt-4 px-6 py-3 text-center rounded-lg font-bold text-white bg-gradient-to-l from-secondary to-primary transition-all duration-300 hover:shadow-lg glassmorphism-button"
                    onClick={() => setIsOpen(false)}
                  >
                    הרשמה
                  </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavigationBar;