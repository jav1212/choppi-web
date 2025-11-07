export interface Store {
  id: number;
  name: string;
  address: string;
  neighborhood: string;
  city: string;
  phone: string;
  hours: string;
  rating: number;
  reviews: number;
  imageUrl: string;
  categories: string[];
  features: string[];
  distance?: number; // en km
}