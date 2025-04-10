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
import FeaturesSection from '../components/FeaturesSection';
import CTASection from '../components/CTASection';
import ScheduleSection from '../components/ScheduleSection';
import TrainersSection from '../components/TrainersSection';
import MembershipSection from '../components/MembershipSection';
import FooterSection from '../components/FooterSection';
import NavigationBar from '../components/NavigationBar';
import Layout from './layout';

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
    <FeaturesSection />
    <CTASection />
    <ScheduleSection />
    <TrainersSection />
    <MembershipSection />
    <FooterSection />
    <NavigationBar />
    <Layout />
  </main>
      
      <footer className="py-6 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; 2025 מכון כושר גמא. כל הזכויות שמורות.
        </div>
      </footer>
    </div>
  );
}
