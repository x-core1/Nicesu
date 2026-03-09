import { useEffect, useState } from "react";
import { useOrders } from "../../Context/OrderContext";
import type { Order } from "../../Context/OrderContext";

const statusColors: Record<Order["status"], string> = {
  pending: "bg-yellow-600",
  paid: "bg-blue-600",
  shipped: "bg-purple-600",
  completed: "bg-green-600",
  rejected: "bg-red-600",
};

const AdminOrders = () => {
  const { getOrders, updateStatus } = useOrders();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (
    id: number,
    status: Order["status"]
  ) => {
    try {
      await updateStatus(id, status);

      setOrders((prev) =>
        prev.map((o) =>
          o.ID === id ? { ...o, status } : o
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-950 min-h-screen text-white p-20">
        <h1 className="text-3xl">Loading orders...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-950 min-h-screen text-white p-20">
        <h1 className="text-red-500">{error}</h1>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen text-white p-20">
      <h1 className="text-4xl font-bold mb-10">Admin Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.ID}
            className="bg-slate-900 p-6 rounded-2xl border border-white/10"
          >
            {/* HEADER */}
            <div className="flex justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  Order from {order.customer_name}
                </h2>

                <p className="text-gray-400 text-sm">
                  {order.payment_method}
                </p>

                <p className="text-gray-500 text-sm">
                  {new Date(order.CreatedAt).toLocaleString()}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.status]}`}
                >
                  {order.status}
                </span>

                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(
                      order.ID,
                      e.target.value as Order["status"]
                    )
                  }
                  className="bg-slate-800 border border-slate-600 rounded px-3 py-2"
                >
                  <option value="pending">pending</option>
                  <option value="shipped">shipped</option>
                  <option value="completed">completed</option>
                  <option value="rejected">rejected</option>
                </select>
              </div>
            </div>

            {/* ITEMS */}
            <div className="border-t border-white/10 pt-4 space-y-2">
              {order.items.map((item) => (
                <div
                  key={`${order.ID}-${item.product_id}`}
                  className="flex justify-between text-gray-300"
                >
                  <span> Product : {item.product?.name ?? "Unknown Product"}</span>
                  <span>
                    Qty : {item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="border-t border-white/10 mt-6 pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>$ {order.total.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;