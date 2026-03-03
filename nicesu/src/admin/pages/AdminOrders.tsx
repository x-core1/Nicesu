import { useOrders } from "../../Context/OrderContext";

const AdminOrders = () => {
  const {
    orders,
    updateOrderStatus,
    refreshOrders,
  } = useOrders();

  const approve = async (id: number) => {
    await updateOrderStatus(id, "APPROVED");
  };

  const reject = async (id: number) => {
    await updateOrderStatus(id, "REJECTED", {
      rejectionReason: "Rejected by admin",
    }); 
  };

  const ship = async (id: number) => {
    await updateOrderStatus(id, "APPROVED", {
      shippingDate: new Date().toISOString(),
    });
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">
        Admin Order Panel
      </h1>

      {orders.map((order) => (
        <div
          key={order.id}
          className="border p-6 mb-6 rounded-xl"
        >
          <p><strong>Customer:</strong> {order.customerName}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> ${order.total}</p>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => approve(order.id)}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Approve
            </button>

            <button
              onClick={() => reject(order.id)}
              className="bg-yellow-600 text-white px-3 py-1 rounded"
            >
              Reject
            </button>

            <button
              onClick={() => ship(order.id)}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Ship
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;