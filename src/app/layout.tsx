import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Hoof Heroes - Professional Goat Hoof Trimming Services",
    template: "%s - Hoof Heroes"
  },
  description: "Professional mobile goat hoof trimming nationwide. Licensed specialists for dairy/meat goats, emergency care. Free quotes 24/7!",
  keywords: [
    "goat hoof trimming", "professional goat care", "mobile goat trimming", "goat hoof trimming near me", 
    "goat health", "livestock care", "emergency goat hoof care", "commercial goat trimming",
    "dairy goat hoof care", "meat goat trimming", "goat hoof rot treatment", "mobile livestock services",
    "professional livestock trimming", "goat hoof maintenance", "large herd goat care",
    "California goat trimming", "Texas goat services", "Florida goat care", "nationwide goat trimming",
    "goat hoof problems", "goat lameness treatment", "mobile animal services", "farm animal hoof care",
    "goat hoof health", "livestock hoof maintenance", "rural goat services", "urban goat care"
  ],
  authors: [{ name: "Hoof Heroes" }],
  creator: "Hoof Heroes",
  publisher: "Hoof Heroes",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hoof Heroes - Professional Goat Hoof Trimming Services Nationwide",
    description: "Professional mobile goat hoof trimming nationwide. Licensed specialists for dairy/meat goats, emergency care. Free quotes 24/7!",
    url: "/",
    siteName: "Hoof Heroes",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hoof Heroes - Professional Goat Hoof Trimming Nationwide",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hoof Heroes - Professional Goat Hoof Trimming Services Nationwide",
    description: "Professional mobile goat hoof trimming nationwide. Licensed specialists for dairy/meat goats, emergency care. Free quotes 24/7!",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#d97706" />
        
        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "Hoof Heroes",
                "description": "Professional mobile goat hoof trimming services nationwide across all 50 US states",
                "url": process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
                "telephone": "+1-555-HOOF-123",
                "email": "info@hoofheroes.com",
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "US"
                },
                "openingHoursSpecification": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday", 
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                  ],
                  "opens": "06:00",
                  "closes": "20:00"
                },
                "serviceArea": [
                  {
                    "@type": "Country",
                    "name": "United States"
                  }
                ],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Professional Goat Care Services",
                  "itemListElement": [
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Professional Goat Hoof Trimming",
                        "description": "Mobile goat hoof trimming service for dairy goats, meat goats, pet goats, and mixed herds",
                        "category": "Animal Care Services"
                      }
                    },
                    {
                      "@type": "Offer", 
                      "itemOffered": {
                        "@type": "Service",
                        "name": "Emergency Goat Hoof Care",
                        "description": "24-hour emergency hoof care for goats with urgent health needs"
                      }
                    },
                    {
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service", 
                        "name": "Routine Goat Hoof Maintenance",
                        "description": "Scheduled regular hoof trimming and health monitoring for goat herds"
                      }
                    }
                  ]
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "bestRating": "5",
                  "worstRating": "1",
                  "ratingCount": "247"
                },
                "priceRange": "$$"
              },
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                "name": "Hoof Heroes Goat Trimming",
                "description": "Nationwide professional goat hoof trimming and care services",
                "serviceType": "Animal Care",
                "provider": {
                  "@type": "LocalBusiness",
                  "name": "Hoof Heroes"
                },
                "areaServed": {
                  "@type": "Country",
                  "name": "United States"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Hoof Heroes",
                "url": process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/?q={search_term_string}`
                  },
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "How often should goats have their hooves trimmed?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Most goats need hoof trimming every 6-12 weeks, depending on their activity level, terrain, and individual growth rates."
                    }
                  },
                  {
                    "@type": "Question", 
                    "name": "How much does professional goat hoof trimming cost?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Professional goat hoof trimming costs typically range from $15-25 per goat for basic trimming, with discounts available for multiple goats. Emergency hoof care services may cost $35-50 per goat."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What are the signs of goat hoof rot?",
                    "acceptedAnswer": {
                      "@type": "Answer", 
                      "text": "Goat hoof rot symptoms include strong odor, dark discharge, separation of hoof wall, and lameness. Professional treatment ensures proper diagnosis and prevents spread to other goats."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Do you provide emergency goat hoof care services?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes, we offer 24/7 emergency goat hoof care for severe lameness, suspected fractures, deep cuts, or sudden onset hoof problems."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What's your service area?", 
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "We serve farms and properties nationwide across all 50 states. We have professional trimmers in every major region of the United States."
                    }
                  }
                ]
              }
            ])
          }}
        />

        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-51J1PWD7M7" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-51J1PWD7M7');
          `}
        </Script>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
