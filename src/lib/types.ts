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