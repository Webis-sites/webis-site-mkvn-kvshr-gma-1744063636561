'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosArrowDown } from 'react-icons/io';
import { useInView } from 'react-intersection-observer';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const faqItems: FAQItem[] = [
    {
      id: 'membership',
      question: 'אילו אפשרויות מנוי קיימות במכון הכושר?',
      answer: 'אנו מציעים מגוון אפשרויות מנוי כולל מנוי חודשי, רבעוני, חצי שנתי ושנתי. בנוסף, ישנן אפשרויות למנויים משפחתיים, סטודנטים וגמלאים. כל המנויים כוללים גישה מלאה למתקני המכון, שיעורי סטודיו וייעוץ אישי ראשוני עם מאמן כושר מוסמך.',
    },
    {
      id: 'hours',
      question: 'מהן שעות הפעילות של המכון?',
      answer: 'המכון פתוח בימים א׳-ה׳ משעה 06:00 עד 23:00, בימי שישי מ-06:00 עד 16:00, ובשבת מ-08:00 עד 20:00. בחגים ומועדים מיוחדים יתכנו שינויים בשעות הפעילות, אנא עקבו אחר ההודעות באפליקציה ובלוח המודעות במכון.',
    },
    {
      id: 'classes',
      question: 'איך אפשר להירשם לשיעורים קבוצתיים?',
      answer: 'ההרשמה לשיעורים קבוצתיים מתבצעת דרך האפליקציה או אתר האינטרנט שלנו. ניתן להירשם לשיעורים עד 48 שעות מראש. אנו מציעים מגוון שיעורים כגון יוגה, פילאטיס, ספינינג, זומבה ועוד. במקרה של ביטול, נבקש להודיע לפחות 4 שעות מראש כדי לאפשר למתאמנים אחרים להשתתף.',
    },
    {
      id: 'trainers',
      question: 'האם ניתן לקבל אימון אישי? מה העלות?',
      answer: 'בהחלט! במכון הכושר שלנו צוות מאמנים אישיים מוסמכים ומנוסים. ניתן לרכוש חבילות אימון אישי של 5, 10 או 20 אימונים, כאשר ככל שכמות האימונים גדולה יותר, המחיר לאימון בודד יורד. המחירים מתחילים מ-150₪ לאימון בודד. לתיאום פגישת היכרות עם מאמן, פנו לקבלה או דרך האפליקציה.',
    },
    {
      id: 'facilities',
      question: 'אילו מתקנים קיימים במכון?',
      answer: 'המכון כולל אזור משקולות חופשיות, אזור מכשירים, אזור קרדיו עם מסלולי ריצה, אופני כושר ואליפטיקלים. בנוסף, יש לנו סטודיו לשיעורים קבוצתיים, חדר ספינינג, סאונה יבשה, מלתחות מרווחות עם מקלחות ולוקרים, ופינת מנוחה עם בר מיצים טבעיים.',
    },
    {
      id: 'beginners',
      question: 'אני חדש/ה בעולם הכושר, האם יש תוכנית מיוחדת למתחילים?',
      answer: 'בהחלט! אנו מציעים תוכנית "צעדים ראשונים בכושר" הכוללת 3 מפגשי הדרכה עם מאמן אישי, הסבר על השימוש במכשירים, ובניית תוכנית אימונים התחלתית המותאמת אישית. בנוסף, ישנם שיעורים קבוצתיים ייעודיים למתחילים. אנו מאמינים שכל אחד יכול להתחיל, ללא קשר לרמת הכושר ההתחלתית.',
    },
    {
      id: 'parking',
      question: 'האם יש חניה זמינה למתאמנים?',
      answer: 'כן, למכון יש חניון פרטי הזמין למנויים ללא תשלום במהלך האימון. החניון פעיל בשעות הפעילות של המכון. בנוסף, ישנה חניה ציבורית בתשלום בסביבה הקרובה. אנו ממליצים להגיע בתחבורה ציבורית בשעות העומס.',
    },
  ];

  const handleToggle = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section 
      ref={ref} 
      className="faq-section py-16 px-4 md:px-8 lg:px-16 rtl"
      dir="rtl"
    >
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary"
          variants={itemVariants}
        >
          שאלות נפוצות
        </motion.h2>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="faq-item bg-glass rounded-xl overflow-hidden"
            >
              <button
                className={`w-full text-right p-5 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all duration-300 ${
                  activeId === item.id ? 'bg-primary-light' : 'bg-transparent'
                }`}
                onClick={() => handleToggle(item.id)}
                aria-expanded={activeId === item.id}
                aria-controls={`content-${item.id}`}
              >
                <span className="font-semibold text-lg">{item.question}</span>
                <motion.div
                  animate={{ rotate: activeId === item.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-primary"
                >
                  <IoIosArrowDown size={24} />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeId === item.id && (
                  <motion.div
                    id={`content-${item.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 border-t border-gray-200 text-gray-700">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FAQSection;