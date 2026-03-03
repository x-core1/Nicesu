import type { Product } from "./product";

export type OrderStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  items: OrderItem[];
  customerName: string;
  total: number;
  payment: string;
  status: OrderStatus;
  shippingDate?: string;
  rejectionReason?: string;
  createdAt: string;
}