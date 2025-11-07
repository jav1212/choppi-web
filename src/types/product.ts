export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  oldPrice?: number;
  category?: string;
}
