import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy - Hoof Heroes',
  description: 'Privacy policy for Hoof Heroes goat hoof trimming services.',
};

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-6">
              <strong>Last updated:</strong> January 2024
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Information We Collect</h2>
            <p>
              When you request a quote through our website, we collect the following information:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Contact information (name, phone number, email address)</li>
              <li>Service location (ZIP code)</li>
              <li>Service requirements (type and number of goats, urgency, special needs)</li>
              <li>Any additional details you choose to provide</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">How We Use Your Information</h2>
            <p>We use the information you provide to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Contact you about your service request</li>
              <li>Provide accurate quotes and scheduling</li>
              <li>Deliver the goat hoof trimming services you request</li>
              <li>Send service-related communications</li>
              <li>Improve our services</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. 
              We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>With service providers who help us operate our business (payment processing, scheduling software)</li>
              <li>When required by law or to protect our legal rights</li>
              <li>In connection with a business transfer or sale</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. However, 
              no method of transmission over the internet is 100% secure.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Cookies and Tracking</h2>
            <p>
              Our website may use cookies and similar technologies to improve user experience 
              and analyze website usage. We use Google Analytics to understand how visitors 
              interact with our site.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Request access to your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information (subject to legal requirements)</li>
              <li>Opt out of marketing communications</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Children&apos;s Privacy</h2>
            <p>
              Our services are not intended for children under 18. We do not knowingly 
              collect personal information from children under 18.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of 
              any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or how we handle your 
              information, please contact us through our website.
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