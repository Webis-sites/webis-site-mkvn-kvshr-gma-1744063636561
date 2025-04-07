'use client';

import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import ProductsSection from '../components/ProductsSection';
import PortfolioSection from '../components/PortfolioSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';
import TestimonialsSection from '../components/TestimonialsSection';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* כאן יתווספו הקומפוננטות שייווצרו על ידי המחולל */}
        <HeroSection />
    <AboutSection />
    <ServicesSection />
    <ProductsSection />
    <PortfolioSection />
    <FAQSection />
    <ContactSection />
    <TestimonialsSection />
  </main>
      
      <footer className="py-6 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; 2025 מכון כושר גמא. כל הזכויות שמורות.
        </div>
      </footer>
    </div>
  );
}