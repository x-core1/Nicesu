import { createContext, useContext, useEffect, useState } from "react";
import type { Order } from "../types/order";
import {
  getOrders,
  createOrder as createOrderService,
  updateOrderStatus as updateOrderStatusService,
} from "../api/order.service";

interface OrderContextType {
  orders: Order[];
  createOrder: (order: Omit<Order, "id">) => Promise<void>;
  refreshOrders: () => Promise<void>;
  updateOrderStatus: (
    id: number,
    status: Order["status"],
    options?: {
      shippingDate?: string;
      rejectionReason?: string;
    }
  ) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const refreshOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      console.error("FAILED TO FETCH ORDERS:", err);
    }
  };

  const createOrder = async (order: Omit<Order, "id">) => {
    try {
      await createOrderService(order);
      await refreshOrders();
    } catch (err) {
      console.error("FAILED TO CREATE ORDER:", err);
    }
  };

  const updateOrderStatus = async (
    id: number,
    status: Order["status"],
    options?: {
      shippingDate?: string;
      rejectionReason?: string;
    }
  ) => {
    try {
      await updateOrderStatusService(id, status, options);
      await refreshOrders();
    } catch (err) {
      console.error("FAILED TO UPDATE ORDER:", err);
    }
  };

  useEffect(() => {
    refreshOrders();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        refreshOrders,
        updateOrderStatus,
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