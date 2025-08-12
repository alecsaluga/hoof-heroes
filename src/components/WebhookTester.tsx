'use client';

import { useState } from 'react';

export default function WebhookTester() {
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const [testResult, setTestResult] = useState<string>('');

  const testWebhook = async () => {
    setIsTestingWebhook(true);
    setTestResult('Testing webhook...');
    
    const testData = {
      goatType: 'test',
      goatCount: '1-5',
      urgency: 'planning',
      zipCode: '12345',
      name: 'Test User',
      phone: '555-0123',
      email: 'test@example.com',
      additionalDetails: 'This is a test submission',
      timestamp: new Date().toISOString(),
      source: 'webhook_test' as const
    };

    try {
      console.log('🧪 Testing webhook with URL:', process.env.NEXT_PUBLIC_WEBHOOK_URL);
      console.log('🧪 Test data:', testData);

      const response = await fetch(process.env.NEXT_PUBLIC_WEBHOOK_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      const responseText = await response.text();
      
      console.log('🧪 Webhook test response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        body: responseText
      });

      if (response.ok) {
        setTestResult(`✅ SUCCESS: ${response.status} ${response.statusText} - ${responseText}`);
      } else {
        setTestResult(`❌ FAILED: ${response.status} ${response.statusText} - ${responseText}`);
      }
    } catch (error) {
      console.error('🧪 Webhook test error:', error);
      setTestResult(`💥 ERROR: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsTestingWebhook(false);
    }
  };

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 bg-yellow-100 border border-yellow-400 p-4 rounded-lg shadow-lg z-[101] max-w-md">
      <h3 className="text-sm font-bold text-yellow-800 mb-2">🔧 Webhook Tester</h3>
      <div className="text-xs text-gray-600 mb-3">
        URL: {process.env.NEXT_PUBLIC_WEBHOOK_URL}
      </div>
      <button
        onClick={testWebhook}
        disabled={isTestingWebhook}
        className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded disabled:opacity-50"
      >
        {isTestingWebhook ? 'Testing...' : 'Test Webhook'}
      </button>
      {testResult && (
        <div className="mt-3 p-2 bg-gray-100 rounded text-xs font-mono break-all">
          {testResult}
        </div>
      )}
    </div>
  );
}