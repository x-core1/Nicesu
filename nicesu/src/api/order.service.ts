const BASE_URL = "http://localhost:5000/orders";

export const getOrders = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const createOrder = async (order: any) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  return res.json();
};

export const updateOrderStatus = async (
  id: number,
  status: string,
  options?: {
    shippingDate?: string;
    rejectionReason?: string;
  }
) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status,
      ...options,
    }),
  });

  return res.json();
};