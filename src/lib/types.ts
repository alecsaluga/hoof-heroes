export interface FormData {
  goatType: string;
  goatCount: string;
  urgency: string;
  zipCode: string;
  name: string;
  phone: string;
  email: string;
  additionalDetails: string;
  timestamp: string;
  source: "website";
}

export interface FormStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface LocationData {
  city: string;
  state: string;
  stateCode: string;
  slug: string;
  stateSlug: string;
  population: number;
  ruralArea: boolean;
  avgPrice: string;
  climate: string;
  zipCodes: string[];
  nearbyFarms: number;
  farmingContext: string;
  regionalNotes: string;
  majorNearbyCities: string[];
}