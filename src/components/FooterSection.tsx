import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const FooterSection: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-gradient-to-br from-primary-100 to-primary-200 text-gray-800 dir-rtl" dir="rtl">
      <div className="footer-glass mx-auto p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Column */}
          <div className="neumorphic-card p-6">
            <h3 className="text-xl font-bold mb-4 text-secondary-700">מכון כושר גמא</h3>
            <p className="mb-4 text-gray-700">
              מכון כושר גמא הוא המקום המושלם לשיפור הכושר והבריאות שלך. אנו מציעים מגוון רחב של ציוד, מאמנים מקצועיים וסביבה תומכת לכל רמות הכושר.
            </p>
            <div className="flex space-x-4 space-x-reverse mt-4">
              <Link href="https://facebook.com" aria-label="פייסבוק" className="social-icon">
                <FaFacebook size={20} />
              </Link>
              <Link href="https://instagram.com" aria-label="אינסטגרם" className="social-icon">
                <FaInstagram size={20} />
              </Link>
              <Link href="https://twitter.com" aria-label="טוויטר" className="social-icon">
                <FaTwitter size={20} />
              </Link>
              <Link href="https://whatsapp.com" aria-label="וואטסאפ" className="social-icon">
                <FaWhatsapp size={20} />
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="neumorphic-card p-6">
            <h3 className="text-xl font-bold mb-4 text-secondary-700">ניווט מהיר</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="footer-link">
                  דף הבית
                </Link>
              </li>
              <li>
                <Link href="/about" className="footer-link">
                  אודות
                </Link>
              </li>
              <li>
                <Link href="/classes" className="footer-link">
                  שיעורים
                </Link>
              </li>
              <li>
                <Link href="/trainers" className="footer-link">
                  מאמנים
                </Link>
              </li>
              <li>
                <Link href="/membership" className="footer-link">
                  חברות
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-link">
                  צור קשר
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="neumorphic-card p-6">
            <h3 className="text-xl font-bold mb-4 text-secondary-700">צור קשר</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <FaMapMarkerAlt className="ml-2 text-secondary-500" />
                <span>רחוב הרצל 123, תל אביב</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="ml-2 text-secondary-500" />
                <a href="tel:+972-3-1234567" className="footer-link">03-1234567</a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="ml-2 text-secondary-500" />
                <a href="mailto:info@gama-gym.co.il" className="footer-link">info@gama-gym.co.il</a>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div className="neumorphic-card p-6">
            <h3 className="text-xl font-bold mb-4 text-secondary-700">שעות פעילות</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="flex items-center">
                  <FaClock className="ml-2 text-secondary-500" /> ראשון - חמישי:
                </span>
                <span>06:00 - 23:00</span>
              </li>
              <li className="flex justify-between">
                <span className="flex items-center">
                  <FaClock className="ml-2 text-secondary-500" /> שישי:
                </span>
                <span>07:00 - 19:00</span>
              </li>
              <li className="flex justify-between">
                <span className="flex items-center">
                  <FaClock className="ml-2 text-secondary-500" /> שבת:
                </span>
                <span>08:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-10 pt-6 border-t border-gray-300/30 text-center">
          <p className="text-sm text-gray-700">
            © {currentYear} מכון כושר גמא. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;