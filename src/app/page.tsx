'use client';

import { useState } from 'react';
import MultiStepForm from '@/components/MultiStepForm';
import Header from '@/components/Header';
import CookieConsent from '@/components/CookieConsent';
// AnalyticsDebugger removed to fix Google tag detection
import { siteContent } from '@/lib/content';
// Analytics imports removed to fix Google tag detection

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  
  // Analytics initialization removed to fix Google tag detection

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main role="main">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-cream via-background to-orange-50 pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            <span className="text-gradient">Professional Goat</span><br />
            Hoof Trimming Services
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {siteContent.hero.subtitle}
          </p>
          <button
            id="get-quote-btn"
            onClick={() => {
              setShowForm(true);
            }}
            className="btn-primary text-lg px-8 py-4 mb-8"
            aria-label="Open quote request form for professional goat hoof trimming"
          >
            {siteContent.hero.cta}
          </button>
          
          {/* Trust Signals */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {siteContent.trustSignals.map((signal, index) => (
              <div key={index} className="text-center p-4 bg-white/50 rounded-lg">
                <div className="font-semibold text-primary">{signal}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Benefits Section */}
      <section id="services" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            Why Choose Professional Goat Hoof Trimming?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteContent.benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-cream/30 hover:bg-cream/50 transition-colors">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Service Areas</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {siteContent.serviceAreas.map((area, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-sm">
                <div className="font-semibold text-primary">{area}</div>
              </div>
            ))}
          </div>
          <p className="text-gray-600 mt-8">
            Don&apos;t see your area? Contact us - we may still be able to serve you!
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {siteContent.faq.map((item, index) => (
              <details key={index} className="group border border-gray-200 rounded-lg">
                <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-gray-800 hover:bg-gray-50">
                  {item.question}
                  <span className="text-primary text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Schedule Your Goat Hoof Trimming?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Get a free quote in under 2 minutes. Professional service guaranteed.
          </p>
          <button
            onClick={() => {
              setShowForm(true);
            }}
            className="bg-white text-primary font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Get Your Free Quote Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-4">Hoof Heroes</h3>
              <p className="text-gray-300">Professional goat hoof trimming services for healthier, happier goats.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="/privacy" className="block text-gray-300 hover:text-white">Privacy Policy</a>
                <a href="/terms" className="block text-gray-300 hover:text-white">Terms of Service</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-gray-300">Licensed & Insured Professional Service</p>
              <p className="text-gray-300">Serving All 50 US States Nationwide</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Hoof Heroes. All rights reserved.</p>
          </div>
        </div>
      </footer>

      </main>
      {/* Multi-Step Form Modal */}
      {showForm && (
        <MultiStepForm onClose={() => setShowForm(false)} />
      )}
      
      {/* Cookie Consent Banner */}
      <CookieConsent />
      
      {/* Analytics Debug Panel removed to fix Google tag detection */}
    </div>
  );
}
