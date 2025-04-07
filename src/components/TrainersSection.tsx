'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

// Define TypeScript interfaces
interface SocialLink {
  platform: 'instagram' | 'facebook' | 'twitter' | 'linkedin';
  url: string;
}

interface Trainer {
  id: number;
  name: string;
  specialty: string;
  bio: string;
  imageUrl: string;
  socialLinks?: SocialLink[];
}

const TrainersSection: React.FC = () => {
  // Sample trainers data
  const trainers: Trainer[] = [
    {
      id: 1,
      name: 'דניאל כהן',
      specialty: 'מאמן כושר אישי',
      bio: 'מאמן כושר מוסמך עם 8 שנות ניסיון בהדרכת אימונים אישיים וקבוצתיים. מתמחה בבניית תוכניות אימון מותאמות אישית.',
      imageUrl: '/images/trainers/trainer1.jpg',
      socialLinks: [
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'facebook', url: 'https://facebook.com' }
      ]
    },
    {
      id: 2,
      name: 'מיכל לוי',
      specialty: 'מאמנת יוגה ופילאטיס',
      bio: 'מאמנת יוגה מוסמכת עם התמחות בפילאטיס. מלמדת את תלמידיה להתחבר לגוף ולנפש דרך תנועה ונשימה.',
      imageUrl: '/images/trainers/trainer2.jpg',
      socialLinks: [
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'twitter', url: 'https://twitter.com' }
      ]
    },
    {
      id: 3,
      name: 'אלון גולן',
      specialty: 'מאמן קרוספיט',
      bio: 'אלון הוא מאמן קרוספיט מוסמך עם ניסיון של 5 שנים. מתמחה באימוני עצימות גבוהה ושיפור ביצועים אתלטיים.',
      imageUrl: '/images/trainers/trainer3.jpg',
      socialLinks: [
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' }
      ]
    },
    {
      id: 4,
      name: 'נועה ברק',
      specialty: 'מאמנת תזונה וכושר',
      bio: 'דיאטנית קלינית ומאמנת כושר המתמחה בשילוב בין תזונה נכונה ואימוני כושר לשיפור הבריאות והכושר הגופני.',
      imageUrl: '/images/trainers/trainer4.jpg',
      socialLinks: [
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'facebook', url: 'https://facebook.com' }
      ]
    },
    {
      id: 5,
      name: 'יובל שרון',
      specialty: 'מאמן ריצה וסיבולת',
      bio: 'מאמן ריצה מקצועי עם ניסיון בהכנת ספורטאים לתחרויות. מתמחה בשיפור סיבולת וטכניקת ריצה.',
      imageUrl: '/images/trainers/trainer5.jpg',
      socialLinks: [
        { platform: 'twitter', url: 'https://twitter.com' },
        { platform: 'instagram', url: 'https://instagram.com' }
      ]
    },
    {
      id: 6,
      name: 'שירה אדלר',
      specialty: 'מאמנת אירובי וזומבה',
      bio: 'מאמנת אירובי וזומבה מוסמכת עם אנרגיות גבוהות. מלמדת שיעורים מהנים ואפקטיביים לשריפת קלוריות.',
      imageUrl: '/images/trainers/trainer6.jpg',
      socialLinks: [
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'facebook', url: 'https://facebook.com' }
      ]
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Function to render social icons
  const renderSocialIcons = (links?: SocialLink[]) => {
    if (!links || links.length === 0) return null;

    return (
      <div className="flex justify-center mt-4 space-x-reverse space-x-3 rtl:space-x-reverse">
        {links.map((link, index) => {
          let Icon;
          switch (link.platform) {
            case 'instagram':
              Icon = FaInstagram;
              break;
            case 'facebook':
              Icon = FaFacebookF;
              break;
            case 'twitter':
              Icon = FaTwitter;
              break;
            case 'linkedin':
              Icon = FaLinkedinIn;
              break;
            default:
              Icon = FaInstagram;
          }

          return (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
              aria-label={`${link.platform} של ${link.platform}`}
            >
              <div className="social-icon">
                <Icon className="w-4 h-4" />
              </div>
            </a>
          );
        })}
      </div>
    );
  };

  return (
    <section className="trainers-section py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            הצוות המקצועי שלנו
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            הכירו את המאמנים המקצועיים שלנו שילוו אתכם בדרך להשגת היעדים שלכם
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {trainers.map((trainer) => (
            <motion.div
              key={trainer.id}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="trainer-card"
            >
              <div className="trainer-image-container">
                <Image
                  src={trainer.imageUrl}
                  alt={`תמונה של ${trainer.name}, ${trainer.specialty}`}
                  width={400}
                  height={400}
                  className="trainer-image"
                />
              </div>
              <div className="trainer-info">
                <h3 className="text-xl font-bold mb-1 text-gray-800 dark:text-white">
                  {trainer.name}
                </h3>
                <p className="text-primary font-medium mb-3">{trainer.specialty}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{trainer.bio}</p>
                {renderSocialIcons(trainer.socialLinks)}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrainersSection;