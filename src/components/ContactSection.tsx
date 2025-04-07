'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useForm } from 'react-hook-form';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

// Fix for Leaflet marker icon issue in Next.js
const markerIcon = new L.Icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Types for form data
type FormData = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

const ContactSection: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  
  // Gym location coordinates
  const position: [number, number] = [31.7683, 35.2137]; // Example coordinates (Jerusalem)
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success handling
      console.log('Form submitted:', data);
      setSubmitStatus('success');
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section py-16 px-4 bg-gradient-to-br from-primary-50 to-secondary-50 rtl" dir="rtl">
      <div className="container mx-auto max-w-6xl">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          צור קשר
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            className="contact-form-container"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="neumorphic-card glassmorphism p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-6 text-primary-700">השאירו פרטים ונחזור אליכם</h3>
              
              <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="form-group">
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-primary-700">
                    שם מלא <span className="text-red-500">*</span>
                  </label>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <input
                      id="name"
                      type="text"
                      className={`neumorphic-input glassmorphism-input w-full p-3 rounded-lg bg-white/40 backdrop-blur-sm border ${errors.name ? 'border-red-500' : 'border-primary-200'} focus:border-primary-500 focus:outline-none transition-all duration-300`}
                      placeholder="הכנס את שמך המלא"
                      {...register('name', { required: 'שדה חובה' })}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </motion.div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone" className="block text-sm font-medium mb-2 text-primary-700">
                    טלפון <span className="text-red-500">*</span>
                  </label>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <input
                      id="phone"
                      type="tel"
                      className={`neumorphic-input glassmorphism-input w-full p-3 rounded-lg bg-white/40 backdrop-blur-sm border ${errors.phone ? 'border-red-500' : 'border-primary-200'} focus:border-primary-500 focus:outline-none transition-all duration-300`}
                      placeholder="הכנס מספר טלפון"
                      {...register('phone', { 
                        required: 'שדה חובה',
                        pattern: {
                          value: /^[0-9]{9,10}$/,
                          message: 'מספר טלפון לא תקין'
                        }
                      })}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </motion.div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-primary-700">
                    אימייל <span className="text-red-500">*</span>
                  </label>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <input
                      id="email"
                      type="email"
                      className={`neumorphic-input glassmorphism-input w-full p-3 rounded-lg bg-white/40 backdrop-blur-sm border ${errors.email ? 'border-red-500' : 'border-primary-200'} focus:border-primary-500 focus:outline-none transition-all duration-300`}
                      placeholder="הכנס כתובת אימייל"
                      {...register('email', { 
                        required: 'שדה חובה',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'כתובת אימייל לא תקינה'
                        }
                      })}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </motion.div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-primary-700">
                    הודעה <span className="text-red-500">*</span>
                  </label>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <textarea
                      id="message"
                      rows={4}
                      className={`neumorphic-input glassmorphism-input w-full p-3 rounded-lg bg-white/40 backdrop-blur-sm border ${errors.message ? 'border-red-500' : 'border-primary-200'} focus:border-primary-500 focus:outline-none transition-all duration-300`}
                      placeholder="כתוב את הודעתך כאן..."
                      {...register('message', { required: 'שדה חובה' })}
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </motion.div>
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="neumorphic-button glassmorphism-button w-full py-3 px-6 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium text-lg transition-all duration-300 hover:shadow-lg disabled:opacity-70"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      שולח...
                    </span>
                  ) : 'שלח'}
                </motion.button>
                
                {submitStatus === 'success' && (
                  <motion.div 
                    className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    ההודעה נשלחה בהצלחה! נחזור אליך בהקדם.
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div 
                    className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    אירעה שגיאה בשליחת הטופס. אנא נסה שוב מאוחר יותר.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
          
          {/* Map and Contact Info */}
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="neumorphic-card glassmorphism p-8 rounded-2xl mb-8">
              <h3 className="text-2xl font-semibold mb-6 text-primary-700">פרטי התקשרות</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="neumorphic-icon glassmorphism-icon p-3 rounded-full bg-primary-100">
                    <FaPhone className="text-primary-600 text-lg" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">טלפון</p>
                    <p className="text-lg font-medium text-primary-800">03-1234567</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="neumorphic-icon glassmorphism-icon p-3 rounded-full bg-primary-100">
                    <FaEnvelope className="text-primary-600 text-lg" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">אימייל</p>
                    <p className="text-lg font-medium text-primary-800">info@gymgama.co.il</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="neumorphic-icon glassmorphism-icon p-3 rounded-full bg-primary-100">
                    <FaMapMarkerAlt className="text-primary-600 text-lg" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">כתובת</p>
                    <p className="text-lg font-medium text-primary-800">רחוב הכושר 123, תל אביב</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="neumorphic-card glassmorphism p-2 rounded-2xl overflow-hidden h-[300px] md:h-[350px]">
              <MapContainer 
                center={position} 
                zoom={15} 
                style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={markerIcon}>
                  <Popup>
                    מכון כושר גמא <br /> רחוב הכושר 123, תל אביב
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;