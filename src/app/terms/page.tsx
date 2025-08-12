import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service - Hoof Heroes',
  description: 'Terms of service for Hoof Heroes goat hoof trimming services.',
};

export default function Terms() {
  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-6">
              <strong>Last updated:</strong> January 2024
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Service Agreement</h2>
            <p>
              By requesting our goat hoof trimming services, you agree to these terms of service. 
              These terms govern the relationship between you and Hoof Heroes.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Service Description</h2>
            <p>
              Hoof Heroes provides professional goat hoof trimming services including:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Professional hoof trimming for all goat breeds</li>
              <li>Basic hoof health assessment</li>
              <li>Identification of potential health issues</li>
              <li>Care recommendations and advice</li>
              <li>Mobile service at your location</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Scheduling and Cancellation</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Appointments must be scheduled in advance</li>
              <li>We require 24-hour notice for cancellations or rescheduling</li>
              <li>Late cancellations may incur a service fee</li>
              <li>Weather-related cancellations will be rescheduled at no charge</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Payment Terms</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Payment is due upon completion of services</li>
              <li>We accept cash, check, and credit cards</li>
              <li>Prices are subject to change based on service requirements</li>
              <li>Additional fees may apply for emergency or after-hours service</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Client Responsibilities</h2>
            <p>As a client, you agree to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Provide accurate information about your goats</li>
              <li>Ensure safe access to your property and animals</li>
              <li>Inform us of any aggressive or difficult animals</li>
              <li>Provide adequate restraint assistance if needed</li>
              <li>Disclose any known health issues or medications</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Liability and Insurance</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Hoof Heroes is licensed and fully insured</li>
              <li>We maintain professional liability insurance</li>
              <li>Clients are responsible for animal behavior during service</li>
              <li>We are not liable for pre-existing health conditions</li>
              <li>Emergency veterinary care is the owner&apos;s responsibility</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Service Limitations</h2>
            <p>
              Our services are limited to basic hoof trimming and assessment. We are not veterinarians 
              and do not provide medical treatment. Serious health issues will be referred to a qualified veterinarian.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Warranty and Satisfaction</h2>
            <p>
              We guarantee professional, quality service. If you&apos;re not satisfied with our work, 
              please contact us within 48 hours to discuss resolution.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Privacy and Data Use</h2>
            <p>
              Your personal information is handled according to our Privacy Policy. 
              We may use your contact information for service-related communications and appointment reminders.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Governing Law</h2>
            <p>
              These terms are governed by the laws of Texas. Any disputes will be resolved 
              in Texas state courts or through binding arbitration.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Changes to Terms</h2>
            <p>
              We reserve the right to update these terms at any time. Changes will be posted 
              on our website with an updated effective date.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Contact Information</h2>
            <p>
              For questions about these terms or our services, please contact us through our website 
              or call our service line.
            </p>
          </div>
          
          <div className="mt-12 pt-8 border-t">
            <Link 
              href="/"
              className="btn-primary"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}