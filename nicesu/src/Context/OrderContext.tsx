import { createContext, useContext } from "react";
import type { Product } from "../types/product";
import axios from "../api/axios";

export type OrderItem = {
  product_id: number;
  quantity: number;
  price: number;
  product: Product
};

export type Order = {
  ID: number;
  customer_name: string;
  items: OrderItem[];
  total: number;
  payment_method: string;
  status: "pending" | "paid" | "shipped" | "completed" | "rejected";
  CreatedAt: string;
};

export type CreateOrderPayload = {
  customer_name: string;
  items: CreateOrderItem[];
  payment_method: string;
};

export type CreateOrderItem = {
  product_id: number
  quantity: number
}

type OrderContextType = {
  createOrder: (payload: CreateOrderPayload) => Promise<Order>;
  getOrders: () => Promise<Order[]>;
  updateStatus: (id: number, status: Order["status"]) => Promise<void>;
};

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {

  const createOrder = async (payload: CreateOrderPayload) => {
    const res = await axios.post("/orders", payload);
    return res.data;
  };

  const getOrders = async () => {
    const res = await axios.get("/orders");
    return res.data;
  };

  const updateStatus = async (id: number, status: Order["status"]) => {

    if (status === "shipped") {
      await axios.put(`/orders/${id}/ship`);
      return;
    }

    if (status === "completed") {
      await axios.put(`/orders/${id}/complete`);
      return;
    }

    if (status === "rejected") {
      await axios.put(`/orders/${id}/reject`, {
        reason: "Rejected by admin",
      });
      return;
    }
  };

  return (
    <OrderContext.Provider
      value={{
        createOrder,
        getOrders,
        updateStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("useOrders must be used inside OrderProvider");
  }

  return context;
};