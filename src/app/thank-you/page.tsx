import Link from 'next/link';

export const metadata = {
  title: 'Thank You - Hoof Heroes',
  description: 'Thank you for requesting a quote for professional goat hoof trimming services.',
};

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Thank You for Your Request!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            We&apos;ve received your information and will contact you within 2 hours with a detailed quote for your goat hoof trimming service.
          </p>
          
          <div className="bg-cream/50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-primary mb-4">What Happens Next?</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">1</div>
                <div>
                  <div className="font-semibold">Quick Response</div>
                  <div className="text-gray-600">We&apos;ll call or text you within 2 hours to discuss your needs</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">2</div>
                <div>
                  <div className="font-semibold">Custom Quote</div>
                  <div className="text-gray-600">Receive a detailed quote based on your specific requirements</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">3</div>
                <div>
                  <div className="font-semibold">Schedule Service</div>
                  <div className="text-gray-600">Book your appointment at a time that works for you</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-8">
            <p className="text-gray-600 mb-6">
              Questions? Call us directly or check out our FAQ section.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/"
                className="btn-primary"
              >
                Back to Home
              </Link>
              <Link 
                href="/#faq"
                className="btn-secondary"
              >
                View FAQ
              </Link>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Emergency Service:</strong> If you have goats with severe hoof problems or injuries, please call us immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}