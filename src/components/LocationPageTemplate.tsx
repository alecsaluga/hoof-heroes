'use client';

import { useState } from 'react';
import { LocationData } from '@/lib/types';
import MultiStepForm from './MultiStepForm';
import Header from './Header';

interface DynamicContent {
  climateSpecificIntro: string;
  climateSpecificCare: string;
  pricingContext: string;
  climateExpertise: string;
  frequencyAdvice: string;
}

interface LocationPageTemplateProps {
  location: LocationData;
  dynamicContent: DynamicContent;
}

export default function LocationPageTemplate({ 
  location, 
  dynamicContent 
}: LocationPageTemplateProps) {
  const [showForm, setShowForm] = useState(false);
  
  const {
    city,
    state,
    nearbyFarms,
    farmingContext,
    population,
    climate,
    avgPrice,
    regionalNotes,
    majorNearbyCities
  } = location;

  const {
    climateSpecificIntro,
    climateSpecificCare,
    pricingContext,
    climateExpertise,
    frequencyAdvice
  } = dynamicContent;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-orange-500 to-amber-600 text-white pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Professional Goat Hoof Trimming in {city}, {state}
          </h1>
          <p className="text-xl mb-8 max-w-4xl mx-auto">
            Expert mobile goat hoof care serving {farmingContext} throughout {city} and surrounding {state} communities
          </p>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-white text-orange-600 font-bold py-4 px-8 rounded-lg text-xl hover:bg-gray-100 transition-colors shadow-lg"
          >
            Get Free Quote in {city} →
          </button>
        </div>
      </section>

      {/* LOCAL INTRODUCTION */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Trusted Goat Hoof Care in {city}, {state}</h2>
          <p className="text-lg mb-4 text-gray-600">
            {city} is home to {nearbyFarms}+ goat operations, from {farmingContext} to commercial herds. 
            {climateSpecificIntro} Our mobile service brings professional hoof trimming directly to your {city} location.
          </p>
          <p className="text-lg mb-6 text-gray-600">
            With {population.toLocaleString()} residents and a thriving agricultural community, {city} goat owners trust Hoof Heroes 
            for reliable, expert hoof care that keeps their animals healthy and mobile.
          </p>
        </div>
      </section>

      {/* WHY PROFESSIONAL TRIMMING MATTERS */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Why Professional Hoof Trimming Matters in {city}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Health & Mobility</h3>
              <p className="mb-4 text-gray-600">
                Proper hoof care prevents lameness, infections, and mobility issues that can devastate goat health. 
                In {city}&apos;s {climate} climate, {climateSpecificCare}.
              </p>
              
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Local Considerations</h3>
              <p className="mb-4 text-gray-600">
                {regionalNotes} Regular professional trimming ensures your {city} goats stay healthy year-round.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Cost Prevention</h3>
              <p className="mb-4 text-gray-600">
                Regular trimming prevents expensive veterinary bills from hoof rot, abscesses, and lameness. 
                Our {avgPrice} service costs far less than emergency treatment.
              </p>
              
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Expertise Matters</h3>
              <p className="mb-4 text-gray-600">
                Professional trimming requires skill and proper tools. DIY attempts can cause injury or improper angles 
                that create long-term problems for your goats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR SERVICES */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Our {city} Goat Hoof Trimming Services</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Complete Hoof Trimming</h3>
              <p className="text-gray-600">Professional trimming of all four hooves, including removal of excess growth and proper angle correction.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Health Assessment</h3>
              <p className="text-gray-600">Visual inspection for signs of rot, thrush, abscesses, or other hoof-related health issues.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Care Recommendations</h3>
              <p className="text-gray-600">Customized advice for your {city} location, including frequency and seasonal care tips.</p>
            </div>
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => setShowForm(true)}
              className="bg-orange-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Schedule Service in {city} →
            </button>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-orange-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Transparent Pricing for {city} Area</h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xl mb-6 text-gray-800">Our {city} service area pricing: <strong>{avgPrice}</strong></p>
            <p className="mb-6 text-gray-600">
              {pricingContext} Pricing varies based on herd size, location within {city}, and specific needs.
            </p>
            <ul className="text-left mb-8 space-y-2 text-gray-700">
              <li>✓ No hidden fees or surprise charges</li>
              <li>✓ Free quotes for {city} area</li>
              <li>✓ Volume discounts for larger herds</li>
              <li>✓ Emergency service available</li>
            </ul>
          </div>
        </div>
      </section>

      {/* LOCAL EXPERTISE */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">{city} Climate & Hoof Care Expertise</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Understanding {state} Conditions</h3>
              <p className="mb-4 text-gray-600">{climateExpertise}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Serving {city} Since 2020</h3>
              <p className="mb-4 text-gray-600">
                We&apos;ve built relationships with {farmingContext} throughout the {city} area. 
                Our local knowledge helps us provide the best possible care for your goats.
              </p>
              <p className="mb-4 text-gray-600">
                Licensed, insured, and trusted by {city} goat owners for professional, reliable service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE PROCESS */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">How Our {city} Service Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="font-semibold mb-2 text-gray-800">Get Quote</h3>
              <p className="text-gray-600">Tell us about your {city} location and herd size</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="font-semibold mb-2 text-gray-800">Schedule Visit</h3>
              <p className="text-gray-600">We&apos;ll arrange a convenient time for your {city} property</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="font-semibold mb-2 text-gray-800">Professional Service</h3>
              <p className="text-gray-600">Expert trimming with proper tools and techniques</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
              <h3 className="font-semibold mb-2 text-gray-800">Follow-up Care</h3>
              <p className="text-gray-600">Recommendations for ongoing hoof health</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Frequently Asked Questions - {city} Goat Owners</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">How often do goats need trimming in {city}?</h3>
              <p className="mb-4 text-gray-600">{frequencyAdvice}</p>
              
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Do you serve all of {city}?</h3>
              <p className="mb-4 text-gray-600">Yes, we cover all of {city} and surrounding areas including {majorNearbyCities.join(", ")}.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">What if my goat has hoof rot?</h3>
              <p className="mb-4 text-gray-600">We can handle mild cases during trimming and will recommend veterinary care for severe infections.</p>
              
              <h3 className="text-lg font-semibold mb-2 text-gray-800">How long does trimming take?</h3>
              <p className="mb-4 text-gray-600">Typically 10-15 minutes per goat, depending on hoof condition and animal cooperation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-orange-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Schedule Your {city} Goat Hoof Trimming?</h2>
          <p className="text-xl mb-8">
            Join hundreds of satisfied {city} goat owners who trust Hoof Heroes for professional hoof care.
          </p>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-white text-orange-600 font-bold py-4 px-8 rounded-lg text-xl hover:bg-gray-100 transition-colors shadow-lg"
          >
            Get Your Free {city} Quote Now →
          </button>
        </div>
      </section>

      {/* FLOATING CTA BUTTON */}
      <div className="fixed bottom-4 right-4 z-40">
        <button 
          onClick={() => setShowForm(true)}
          className="bg-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-orange-700 transition-colors"
        >
          Get Quote
        </button>
      </div>

      {/* Multi-Step Form Modal */}
      {showForm && (
        <MultiStepForm onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}