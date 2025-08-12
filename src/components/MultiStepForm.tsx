'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { siteContent, formOptions } from '@/lib/content';
import ProgressBar from './ProgressBar';
import { 
  trackFormStep, 
  trackFormSubmission, 
  trackFormNavigation, 
  trackFormAbandonment,
  trackError,
  trackCTAClick 
} from '@/lib/analytics';

const formSchema = z.object({
  goatType: z.string().min(1, 'Please select a goat type'),
  goatCount: z.string().min(1, 'Please select the number of goats'),
  urgency: z.string().min(1, 'Please select your timeline'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
  name: z.string().min(1, 'Name is required'),
  phone: z.string().regex(/^[\d\s\-\(\)\+\.]{10,}$/, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  additionalDetails: z.string().optional(),
  a2pConsent: z.boolean().optional(),
});

type FormInputs = z.infer<typeof formSchema>;

export default function MultiStepForm({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStartTime] = useState<number>(Date.now());
  const totalSteps = 6;

  const { register, formState: { errors }, watch, trigger } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    mode: 'onChange'
  });

  const watchedValues = watch();

  // Track form initialization
  useEffect(() => {
    trackFormStep(1, 'Form Opened', { timestamp: formStartTime });
  }, [formStartTime]);

  // Track form abandonment when component unmounts
  useEffect(() => {
    return () => {
      if (currentStep < totalSteps) {
        const timeSpent = Date.now() - formStartTime;
        trackFormAbandonment(currentStep, Math.round(timeSpent / 1000));
      }
    };
  }, [currentStep, totalSteps, formStartTime]);

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormInputs)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ['goatType'];
        break;
      case 2:
        fieldsToValidate = ['goatCount'];
        break;
      case 3:
        fieldsToValidate = ['urgency'];
        break;
      case 4:
        fieldsToValidate = ['zipCode'];
        break;
      case 5:
        fieldsToValidate = ['name', 'phone', 'email'];
        break;
      case 6:
        fieldsToValidate = [];
        break;
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid && currentStep < totalSteps) {
      // Track successful step completion
      const stepName = getStepName(currentStep);
      const currentFormData = watchedValues;
      trackFormStep(currentStep, stepName, currentFormData);
      
      // Track navigation to next step
      trackFormNavigation('next', currentStep, currentStep + 1);
      
      setCurrentStep(currentStep + 1);
    } else if (!isValid) {
      // Track validation errors
      trackError(`Validation failed on step ${currentStep}`, 'form_validation');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      // Track backward navigation
      trackFormNavigation('previous', currentStep, currentStep - 1);
      setCurrentStep(currentStep - 1);
    }
  };

  // Helper function to get step names for tracking
  const getStepName = (step: number): string => {
    const stepNames = {
      1: 'Goat Type Selection',
      2: 'Goat Count Selection', 
      3: 'Urgency Level Selection',
      4: 'ZIP Code Entry',
      5: 'Contact Information',
      6: 'Additional Details'
    };
    return stepNames[step as keyof typeof stepNames] || `Step ${step}`;
  };

  const onSubmit = async (data: FormInputs) => {
    setIsSubmitting(true);
    
    const formData = {
      ...data,
      timestamp: new Date().toISOString(),
      source: 'website' as const
    };

    // Track final step completion before submission
    trackFormStep(6, 'Form Completed - Final Step', formData);

    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('🚀 Form submission starting...', {
          url: process.env.NEXT_PUBLIC_WEBHOOK_URL,
          formData
        });
      }

      const response = await fetch(process.env.NEXT_PUBLIC_WEBHOOK_URL!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (process.env.NODE_ENV === 'development') {
        console.log('📡 Webhook response:', {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok
        });
      }

      if (response.ok) {
        // Track successful form submission conversion
        trackFormSubmission(formData);
        
        // Track total form completion time
        const totalTime = Date.now() - formStartTime;
        trackFormStep(7, 'Form Successfully Submitted', {
          ...formData,
          total_completion_time: Math.round(totalTime / 1000),
          submission_success: true
        });
        
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Form submission successful! Redirecting to thank you page...');
        }
        window.location.href = '/thank-you';
      } else {
        // Get more details about the error
        const errorText = await response.text();
        if (process.env.NODE_ENV === 'development') {
          console.error('❌ Form submission failed:', {
            status: response.status,
            statusText: response.statusText,
            body: errorText
          });
        }
        
        trackError(`Form submission failed with status: ${response.status} - ${errorText}`, 'form_submission');
        alert(`Submission failed: ${response.status} ${response.statusText}. Please try again or contact support.`);
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('💥 Form submission error:', error);
      }
      trackError(`Form submission error: ${error}`, 'form_submission');
      alert(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your connection and try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">{siteContent.formSteps.step1.title}</h2>
            <p className="text-gray-600">{siteContent.formSteps.step1.description}</p>
            <div className="space-y-3">
              {formOptions.goatTypes.map((option) => (
                <label key={option.value} className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-cream/50 transition-colors">
                  <input
                    type="radio"
                    value={option.value}
                    {...register('goatType')}
                    className="mt-1 h-4 w-4 text-primary focus:ring-primary"
                  />
                  <div>
                    <div className="font-semibold text-gray-800">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
            {errors.goatType && <p className="text-red-600 text-sm">{errors.goatType.message}</p>}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">{siteContent.formSteps.step2.title}</h2>
            <p className="text-gray-600">{siteContent.formSteps.step2.description}</p>
            <div className="grid grid-cols-2 gap-3">
              {formOptions.goatCounts.map((option) => (
                <label key={option.value} className="flex items-center justify-center p-6 border rounded-lg cursor-pointer hover:bg-cream/50 transition-colors font-semibold">
                  <input
                    type="radio"
                    value={option.value}
                    {...register('goatCount')}
                    className="sr-only"
                  />
                  <span className={`${watchedValues.goatCount === option.value ? 'text-primary' : 'text-gray-700'}`}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
            {errors.goatCount && <p className="text-red-600 text-sm">{errors.goatCount.message}</p>}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">{siteContent.formSteps.step3.title}</h2>
            <p className="text-gray-600">{siteContent.formSteps.step3.description}</p>
            <div className="space-y-3">
              {formOptions.urgencyLevels.map((option) => (
                <label key={option.value} className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-cream/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      value={option.value}
                      {...register('urgency')}
                      className="h-4 w-4 text-primary focus:ring-primary"
                    />
                    <span className="font-semibold text-gray-800">{option.label}</span>
                  </div>
                  {option.badge && (
                    <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full">
                      {option.badge}
                    </span>
                  )}
                </label>
              ))}
            </div>
            {errors.urgency && <p className="text-red-600 text-sm">{errors.urgency.message}</p>}
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">{siteContent.formSteps.step4.title}</h2>
            <p className="text-gray-600">{siteContent.formSteps.step4.description}</p>
            <div>
              <input
                type="text"
                placeholder="Enter ZIP code (e.g., 78701)"
                {...register('zipCode')}
                className="w-full p-4 border rounded-lg text-lg font-mono focus:ring-2 focus:ring-primary focus:border-primary"
              />
              {errors.zipCode && <p className="text-red-600 text-sm mt-2">{errors.zipCode.message}</p>}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">{siteContent.formSteps.step5.title}</h2>
            <p className="text-gray-600">{siteContent.formSteps.step5.description}</p>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Full name"
                  {...register('name')}
                  className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone number"
                  {...register('phone')}
                  className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
                {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  {...register('email')}
                  className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">{siteContent.formSteps.step6.title}</h2>
            <p className="text-gray-600">{siteContent.formSteps.step6.description}</p>
            <textarea
              placeholder="Tell us about any special requirements, health concerns, or questions..."
              rows={4}
              {...register('additionalDetails')}
              className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none"
            />
            
            {/* A2P Consent Checkbox */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('a2pConsent')}
                  className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <div className="text-sm text-gray-700">
                  <div className="font-semibold mb-1">SMS/Text Message Consent (Optional)</div>
                  <div>
                    I consent to receive text messages and calls from Hoof Heroes and its service providers regarding my quote request. Message and data rates may apply. I understand I can opt out at any time by replying STOP.
                  </div>
                  <div className="mt-2 text-xs text-gray-600">
                    By checking this box, you agree to our{' '}
                    <a href="/terms" target="_blank" className="text-primary hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="/privacy" target="_blank" className="text-primary hover:underline">Privacy Policy</a>.
                  </div>
                </div>
              </label>
              {errors.a2pConsent && <p className="text-red-600 text-sm mt-2">{errors.a2pConsent.message}</p>}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-primary">Get Your Free Quote</h1>
            <button
              onClick={() => {
                trackCTAClick('Close Form', `Step ${currentStep}`);
                onClose();
              }}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              aria-label="Close quote form"
            >
              ×
            </button>
          </div>
          
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          
          <div className="mt-8">
            {renderStep()}
            
            <div className="flex justify-between mt-8 pt-6 border-t">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    trackCTAClick('Previous Step', `Step ${currentStep}`);
                    prevStep();
                  }}
                  className="btn-secondary"
                >
                  Previous
                </button>
              )}
              
              <div className={currentStep === 1 ? 'ml-auto' : ''}>
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={() => {
                      trackCTAClick('Next Step', `Step ${currentStep}`);
                      nextStep();
                    }}
                    className="btn-primary"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={isSubmitting}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={async () => {
                      if (!isSubmitting) {
                        trackCTAClick('Get My Quote - Submit Form', 'Step 6');
                        const formData = watchedValues;
                        await onSubmit(formData as FormInputs);
                      }
                    }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Get My Quote'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}