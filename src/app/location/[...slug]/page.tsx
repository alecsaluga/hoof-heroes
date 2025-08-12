import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { LocationData } from '@/lib/types';
import { 
  generateLocationMetadata, 
  generateLocalSchema,
  generateClimateSpecificIntro,
  generateClimateSpecificCare,
  generatePricingContext,
  generateClimateExpertise,
  generateFrequencyAdvice
} from '@/lib/locationContent';
import LocationPageTemplate from '@/components/LocationPageTemplate';
import citiesData from '../../../../data/cities.json';

interface LocationPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

// Generate static params for all city pages
export async function generateStaticParams() {
  const cities = citiesData as LocationData[];
  
  return cities.map((city) => ({
    slug: [`goat-hoof-trimming-${city.slug}-${city.stateSlug}`]
  }));
}

// Generate metadata for each location page
export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const cities = citiesData as LocationData[];
  const resolvedParams = await params;
  const citySlug = resolvedParams.slug[0];
  
  // Extract city and state from slug
  const slugParts = citySlug.replace('goat-hoof-trimming-', '').split('-');
  const stateSlug = slugParts.pop();
  const citySlugPart = slugParts.join('-');
  
  const location = cities.find(
    city => city.slug === citySlugPart && city.stateSlug === stateSlug
  );

  if (!location) {
    return {
      title: 'Location Not Found',
      description: 'The requested location page could not be found.'
    };
  }

  const metadata = generateLocationMetadata(location);
  
  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `/location/goat-hoof-trimming-${location.slug}-${location.stateSlug}`,
      siteName: 'Hoof Heroes',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
    },
    alternates: {
      canonical: `/location/goat-hoof-trimming-${location.slug}-${location.stateSlug}`,
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const cities = citiesData as LocationData[];
  const resolvedParams = await params;
  const citySlug = resolvedParams.slug[0];
  
  // Extract city and state from slug
  const slugParts = citySlug.replace('goat-hoof-trimming-', '').split('-');
  const stateSlug = slugParts.pop();
  const citySlugPart = slugParts.join('-');
  
  const location = cities.find(
    city => city.slug === citySlugPart && city.stateSlug === stateSlug
  );

  if (!location) {
    notFound();
  }

  // Generate dynamic content
  const climateSpecificIntro = generateClimateSpecificIntro(location);
  const climateSpecificCare = generateClimateSpecificCare(location);
  const pricingContext = generatePricingContext(location);
  const climateExpertise = generateClimateExpertise(location);
  const frequencyAdvice = generateFrequencyAdvice(location);
  const schema = generateLocalSchema(location);

  const dynamicContent = {
    climateSpecificIntro,
    climateSpecificCare,
    pricingContext,
    climateExpertise,
    frequencyAdvice,
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
      
      <LocationPageTemplate 
        location={location} 
        dynamicContent={dynamicContent}
      />
    </>
  );
}