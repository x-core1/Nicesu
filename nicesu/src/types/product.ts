export type ProductStatus =
  | "available"
  | "ordered"
  | "shipped"


export interface Product {
  id: number;
  name: string;
  price: number;
  status: ProductStatus;
  image: string;
  stock: number;
}