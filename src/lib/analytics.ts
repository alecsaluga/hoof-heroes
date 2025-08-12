// Google Analytics 4 tracking utilities
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Extend Window interface for GA4
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Initialize GA4
export const gtag = (...args: unknown[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
};

// Track page views
export const pageview = (url: string) => {
  gtag('config', GA_TRACKING_ID, {
    page_location: url,
  });
};

// Enhanced event tracking with custom parameters
export const trackEvent = ({
  action,
  category = 'General',
  label,
  value,
  custom_parameters = {}
}: {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, unknown>;
}) => {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    ...custom_parameters
  });
};

// Form step tracking
export const trackFormStep = (stepNumber: number, stepName: string, formData?: unknown) => {
  gtag('event', 'form_step_completed', {
    event_category: 'Form Interaction',
    event_label: `Step ${stepNumber}: ${stepName}`,
    step_number: stepNumber,
    step_name: stepName,
    form_data: formData ? JSON.stringify(formData) : undefined,
    custom_parameter_step: stepNumber
  });
};

// Form submission conversion tracking
export const trackFormSubmission = (formData: Record<string, unknown>) => {
  // Main conversion event
  gtag('event', 'conversion', {
    send_to: GA_TRACKING_ID,
    event_category: 'Form Submission',
    event_label: 'Quote Request Completed',
    value: 1,
    currency: 'USD',
    transaction_id: `quote_${Date.now()}`,
    goat_type: formData.goatType,
    goat_count: formData.goatCount,
    urgency: formData.urgency,
    zip_code: formData.zipCode
  });

  // Custom lead generation event
  gtag('event', 'generate_lead', {
    event_category: 'Conversion',
    event_label: 'Goat Hoof Trimming Quote',
    value: 25, // Estimated value per lead
    currency: 'USD',
    lead_type: 'quote_request',
    service_type: 'goat_hoof_trimming'
  });

  // Contact form submission event
  gtag('event', 'contact', {
    event_category: 'User Engagement',
    method: 'quote_form'
  });
};

// CTA button click tracking
export const trackCTAClick = (buttonText: string, location: string) => {
  gtag('event', 'click', {
    event_category: 'CTA Button',
    event_label: `${buttonText} - ${location}`,
    button_text: buttonText,
    button_location: location
  });
};

// Form navigation tracking
export const trackFormNavigation = (action: 'next' | 'previous', fromStep: number, toStep: number) => {
  gtag('event', 'form_navigation', {
    event_category: 'Form Interaction',
    event_label: `${action.charAt(0).toUpperCase() + action.slice(1)} - Step ${fromStep} to ${toStep}`,
    navigation_type: action,
    from_step: fromStep,
    to_step: toStep
  });
};

// Form abandonment tracking
export const trackFormAbandonment = (stepNumber: number, timeSpent: number) => {
  gtag('event', 'form_abandon', {
    event_category: 'Form Interaction',
    event_label: `Abandoned at Step ${stepNumber}`,
    step_number: stepNumber,
    time_spent: timeSpent,
    abandonment_point: `step_${stepNumber}`
  });
};

// Error tracking
export const trackError = (errorMessage: string, errorLocation: string) => {
  gtag('event', 'exception', {
    description: errorMessage,
    fatal: false,
    error_location: errorLocation
  });
};

// Enhanced measurement events (these work with GA4's built-in tracking)
export const trackEngagement = (engagementType: string, details?: Record<string, unknown>) => {
  gtag('event', 'engagement', {
    event_category: 'User Engagement',
    event_label: engagementType,
    ...details
  });
};

// Scroll tracking for long-form content
export const trackScroll = (percentage: number) => {
  gtag('event', 'scroll', {
    event_category: 'User Engagement',
    event_label: `${percentage}% Scrolled`,
    scroll_depth: percentage
  });
};

// Video/content interaction tracking
export const trackContentInteraction = (contentType: string, action: string) => {
  gtag('event', 'content_interaction', {
    event_category: 'Content Engagement',
    event_label: `${contentType} - ${action}`,
    content_type: contentType,
    interaction_type: action
  });
};