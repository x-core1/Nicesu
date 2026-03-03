export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  badge?: "HOT" | "NEW";
}