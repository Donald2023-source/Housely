export type PropertyType =
  | "apartment"
  | "duplex"
  | "bungalow"
  | "terrace"
  | "detached"
  | "semi-detached"
  | "land"
  | "office";

export type ListingType = "sale" | "rent" | "shortlet";

export type Currency = "NGN" | "USD";

export interface PropertyLocation {
  address: string;
  area: string;
  city: string;
  state: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface PropertyAgent {
  _id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  bio?: string;
  agency?: string;
  licenseNumber?: string;
  location?: {
    city: string;
    state: string;
    country: string;
  };
  specialties: string[];
  yearsOfExperience: number;
  verified: boolean;
  rating: number;
  reviewsCount: number;
  propertiesCount: number;
}

export interface PropertyItem {
  _id: string;

  name: string;
  description: string;

  images: string[];

  propertyType: PropertyType;
  listingType: ListingType;

  price: number;
  currency: Currency;

  bedrooms: number;
  bathrooms: number;
  toilets: number;

  area: number;
  yearBuilt?: number;

  furnished: boolean;

  features: string[];

  location: PropertyLocation;

  agent: string | PropertyAgent;

  rating: number;
  reviewsCount: number;

  verified: boolean;
  featured: boolean;

  views: number;
  favorites: number;

  createdAt: string;
  updatedAt: string;
}