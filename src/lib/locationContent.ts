import type { LocationData } from './types';

// Dynamic content generation functions for location pages

export function generateClimateSpecificIntro(location: LocationData): string {
  const { city, climate } = location;
  
  switch (climate) {
    case 'Mediterranean':
      return `${city}'s Mediterranean climate provides ideal year-round conditions for goat keeping, with mild winters and warm, dry summers that promote healthy hoof growth.`;
    case 'Humid continental':
      return `${city}'s continental climate with cold winters and warm summers creates seasonal challenges for goat hoof health, requiring adjusted care throughout the year.`;
    case 'Humid subtropical':
      return `${city}'s humid subtropical climate with hot summers and mild winters creates rapid hoof growth and increased moisture-related concerns.`;
    case 'Semi-arid':
      return `${city}'s semi-arid climate with low humidity and temperature extremes can lead to hard, brittle hooves that require specialized trimming techniques.`;
    case 'Hot desert':
      return `${city}'s desert climate with extreme heat and minimal moisture creates unique challenges for goat hoof health and trimming schedules.`;
    case 'Oceanic':
      return `${city}'s oceanic climate with frequent rain and high humidity creates soft hoof conditions that require more frequent professional attention.`;
    case 'Tropical':
      return `${city}'s tropical climate with year-round heat and humidity accelerates hoof growth and increases risks of fungal infections.`;
    default:
      return `${city}'s climate creates specific considerations for goat hoof health that our experienced team understands and addresses.`;
  }
}

export function generateClimateSpecificCare(location: LocationData): string {
  const { climate } = location;
  
  switch (climate) {
    case 'Mediterranean':
      return 'the dry summers help prevent moisture-related hoof problems, while mild winters allow year-round outdoor access';
    case 'Humid continental':
      return 'winter barn housing can increase moisture levels while summer heat requires vigilant monitoring for hoof problems';
    case 'Humid subtropical':
      return 'high humidity and warmth accelerate hoof growth and create ideal conditions for bacterial and fungal infections';
    case 'Semi-arid':
      return 'low humidity can cause hooves to become brittle and crack, requiring moisturizing treatments and adjusted trimming angles';
    case 'Hot desert':
      return 'extreme heat hardens hooves while minimal moisture can cause cracking and splitting';
    case 'Oceanic':
      return 'constant moisture softens hooves, making them prone to overgrowth, rot, and requiring more frequent trimming';
    case 'Tropical':
      return 'constant warmth and humidity create rapid growth and perfect conditions for hoof rot and thrush';
    default:
      return 'local weather patterns affect hoof health in ways our experienced team monitors closely';
  }
}

export function generatePricingContext(location: LocationData): string {
  const { city, avgPrice, ruralArea } = location;
  
  if (ruralArea) {
    return `Our competitive rural pricing reflects the agricultural nature of the ${city} area, offering excellent value for farm operations.`;
  }
  
  const price = parseInt(avgPrice.split('-')[0].replace('$', ''));
  
  if (price >= 175) {
    return `Given ${city}'s metropolitan cost structure, our professional services are priced competitively while maintaining the highest quality standards.`;
  } else if (price >= 125) {
    return `Our ${city} pricing reflects the local market while ensuring you receive expert, professional service that prevents costly hoof problems.`;
  } else {
    return `Our affordable ${city} pricing makes professional goat hoof care accessible to all local farmers and goat owners.`;
  }
}

export function generateClimateExpertise(location: LocationData): string {
  const { city, state, climate, regionalNotes } = location;
  
  const baseExpertise = {
    'Mediterranean': `${city}'s Mediterranean climate rarely creates hoof moisture problems, but the dry conditions can lead to hard, brittle hooves that require careful trimming to prevent cracking. We adjust our techniques to maintain proper hoof flexibility while preventing overgrowth during the long growing season.`,
    'Humid continental': `${state}'s continental climate presents unique challenges with seasonal extremes. Cold winter barn housing increases hoof moisture, while hot summers can cause rapid drying. Our trimming schedule adapts to these seasonal changes, ensuring optimal hoof health year-round.`,
    'Humid subtropical': `The warm, humid conditions in ${city} accelerate hoof growth and create ideal environments for bacterial infections. We schedule more frequent visits during peak growing seasons and provide preventive treatments to combat moisture-related problems.`,
    'Semi-arid': `${city}'s dry climate can cause hooves to become brittle and prone to cracking. We use specialized techniques to maintain hoof moisture and flexibility while preventing the overgrowth that brittle hooves are susceptible to.`,
    'Hot desert': `Desert conditions in ${city} create extremely hard hooves that require power tools and specialized techniques. The low humidity can cause painful cracking, so we focus on maintaining proper moisture balance through trimming techniques and care recommendations.`,
    'Oceanic': `${city}'s wet climate keeps hooves consistently soft, leading to rapid overgrowth and increased susceptibility to rot and bacterial infections. We provide more frequent trimming services and focus heavily on preventive care in these challenging conditions.`,
    'Tropical': `The constant warmth and humidity in ${city} creates year-round rapid hoof growth and perfect conditions for fungal and bacterial problems. Our tropical climate expertise includes aggressive preventive measures and frequent monitoring schedules.`
  };
  
  return baseExpertise[climate as keyof typeof baseExpertise] || 
    `Our team understands how ${city}'s unique climate affects goat hoof health and adjusts our approach accordingly. ${regionalNotes}`;
}

export function generateFrequencyAdvice(location: LocationData): string {
  const { city, climate } = location;
  
  const frequencies = {
    'Mediterranean': `In ${city}'s Mediterranean climate, most goats need trimming every 8-10 weeks during growing season, with slightly longer intervals in winter.`,
    'Humid continental': `${city}'s seasonal climate typically requires trimming every 6-8 weeks in summer and 8-12 weeks in winter, depending on housing conditions.`,
    'Humid subtropical': `The warm, humid conditions in ${city} accelerate growth, requiring trimming every 6-8 weeks year-round, with more frequent attention during peak growing seasons.`,
    'Semi-arid': `In ${city}'s dry climate, trimming intervals of 8-12 weeks are typical, though brittle hoof conditions may require more frequent attention for crack prevention.`,
    'Hot desert': `Desert conditions slow growth somewhat, allowing 8-12 week intervals, but monitoring for stress cracks requires more frequent inspection.`,
    'Oceanic': `${city}'s wet climate necessitates trimming every 6-8 weeks due to rapid growth and constant moisture concerns.`,
    'Tropical': `The tropical climate in ${city} requires the most frequent attention - every 4-6 weeks - due to rapid growth and infection risks.`
  };
  
  return frequencies[climate as keyof typeof frequencies] || 
    `Most goats in ${city} need professional trimming every 6-10 weeks, though local conditions may affect this schedule.`;
}

export function generateLocationMetadata(location: LocationData) {
  const { city, state, farmingContext, avgPrice } = location;
  
  return {
    title: `Professional Goat Hoof Trimming in ${city}, ${state} | Expert Mobile Service`,
    description: `Expert goat hoof trimming in ${city}, ${state}. Serving ${farmingContext} with professional mobile service. Pricing ${avgPrice}. Licensed & insured. Get your free quote today!`,
    keywords: [
      `goat hoof trimming ${city}`,
      `${city} goat care`,
      `mobile goat trimming ${state}`,
      `goat hoof trimming near ${city}`,
      `professional goat care ${city}`,
      `${state} goat hoof trimming`,
      `goat trimming service ${city}`
    ]
  };
}

export function generateLocalSchema(location: LocationData) {
  const { city, state, stateCode, zipCodes, avgPrice } = location;
  
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Hoof Heroes - ${city} Goat Hoof Trimming`,
    "description": `Professional goat hoof trimming service in ${city}, ${state}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city,
      "addressRegion": stateCode,
      "postalCode": zipCodes[0],
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "City",
      "name": `${city}, ${state}`
    },
    "priceRange": avgPrice,
    "telephone": "1-800-HOOF-HERO",
    "serviceType": ["Goat Hoof Trimming", "Mobile Goat Care", "Livestock Hoof Maintenance"],
    "paymentAccepted": ["Cash", "Credit Card", "Check"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${city} Goat Care Services`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Professional Goat Hoof Trimming",
            "description": `Expert hoof trimming for goats in ${city}, ${state}`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Mobile Goat Care",
            "description": `On-site goat hoof care service in ${city}`
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "worstRating": "1", 
      "ratingCount": "127"
    }
  };
}