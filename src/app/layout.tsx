import React from 'react';
import { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import NavigationBar from '../components/NavigationBar';
import FooterSection from '../components/FooterSection';
import './globals.css';

// Configure Hebrew font
const rubik = Rubik({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-rubik',
});

// Metadata for the website
export const metadata: Metadata = {
  title: 'מכון כושר גמא | אימונים מקצועיים ואיכותיים',
  description: 'מכון כושר מוביל המספק שירות מקצועי ואיכותי. הזמינו תור עוד היום!',
  keywords: 'מכון כושר, שירות, איכות, מקצועיות, ישראל',
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: 'https://www.gymgama.co.il',
    siteName: 'מכון כושר גמא',
    title: 'מכון כושר גמא | אימונים מקצועיים ואיכותיים',
    description: 'מכון כושר מוביל המספק שירות מקצועי ואיכותי. הזמינו תור עוד היום!',
    images: [
      {
        url: '/images/gym-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'מכון כושר גמא',
      },
    ],
  },
};

// Schema.org markup for local business
const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'מכון כושר גמא',
  description: 'מכון כושר מוביל המספק שירות מקצועי ואיכותי',
  image: '/images/gym-logo.png',
  telephone: '+972-XX-XXXXXXX',
  email: 'info@gymgama.co.il',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'רחוב הדוגמה 123',
    addressLocality: 'תל אביב',
    postalCode: '6100000',
    addressCountry: 'IL',
  },
  openingHours: 'Su-Th 06:00-23:00, Fr 06:00-17:00, Sa 08:00-22:00',
  priceRange: '₪₪',
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="he" dir="rtl" className={rubik.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 text-gray-800">
        <div className="flex flex-col min-h-screen">
          {/* Glassmorphic background elements */}
          <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/20 blur-3xl"></div>
            <div className="absolute bottom-40 left-20 w-96 h-96 rounded-full bg-secondary/20 blur-3xl"></div>
            <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full bg-accent/10 blur-3xl"></div>
          </div>
          
          {/* Main layout */}
          <header className="sticky top-0 z-50">
            <div className="glassmorphic-nav border-b border-white/20 backdrop-blur-md bg-white/60">
              <NavigationBar />
            </div>
          </header>
          
          <main className="flex-grow">
            <div className="container mx-auto px-4 py-8">
              {children}
            </div>
          </main>
          
          <footer className="mt-auto">
            <div className="glassmorphic-footer border-t border-white/20 backdrop-blur-md bg-white/60">
              <FooterSection />
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
