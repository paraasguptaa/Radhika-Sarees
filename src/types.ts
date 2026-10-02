export type MainCategory =
  | 'All'
  | 'Sarees'
  | 'Lehengas'
  | 'Mens Wear'
  | 'Coat Suits & Blazers'
  | 'Sherwani & Indo-Western'
  | 'Ladies Wear'
  | 'Kids Wear';

export type CollectionFilter = 'New Arrivals' | 'Bridal Wear' | 'Festive Collection' | 'All';

export interface ProductItem {
  id: string;
  name: string;
  category: MainCategory;
  collectionType: 'New Arrivals' | 'Bridal Wear' | 'Festive Collection' | 'Regular';
  rating: number;
  reviewsCount: number;
  images: string[];
  description: string;
  fabric: string;
  work: string;
  customizationAvailable: string[];
  sizesAvailable?: string[];
  length?: string;
  washCare: string;
  color: string;
  inStock: boolean;
  featured?: boolean;
  tag?: string;
}

export interface CustomerReview {
  id: string;
  reviewerName: string;
  initials: string;
  rating: number;
  comment: string;
  productCategory: string;
  location: string;
  verifiedBuyer: boolean;
  date: string;
}

export interface CustomizationPreferences {
  customizationType: 'Fall Pico' | 'Custom Blouse Stitching' | 'Suit Tailoring' | 'Sherwani Fitting' | 'None';
  bustSize?: string;
  waistSize?: string;
  lengthPreference?: string;
  specialNotes?: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  productInterest?: string;
  message: string;
  customizationNeeds?: string;
  createdAt: string;
}
