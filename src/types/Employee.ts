export interface Employee {
  id: string;
  name: string;
  title: string;
  company: string;
  companyLogo?: string;
  reraNumber?: string;
  phones: string[];
  email: string;
  website?: string;
  avatar?: string;
  bio?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  social?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
  };
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}