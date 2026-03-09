import { useState } from "react";
import { useCart } from "../Context/CartContext";
import { useOrders } from "../Context/OrderContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { createOrder } = useOrders();

  const [loading, setLoading] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setLoading(true);

    try {
      const payload = {
        customer_name: "Guest User",
        payment_method: "COD",
        total: total,
        items: cart.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
        })),
      };

      console.log("CHECKOUT PAYLOAD", payload);

      await createOrder(payload);

      clearCart();

      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 3000);
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {showNotif && (
        <div className="bg-green-600 text-white p-3 rounded mb-4">
          Order berhasil dibuat!
        </div>
      )}

      {cart.length === 0 ? (
        <p className="text-gray-400">Cart kosong.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center justify-between bg-gray-800 p-4 rounded"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />

                <div>
                  <h2 className="font-semibold">{item.product.name}</h2>
                  <p className="text-gray-400">$ {item.product.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  className="px-2 py-1 bg-gray-700 rounded"
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity - 1)
                  }
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  className="px-2 py-1 bg-gray-700 rounded"
                  onClick={() =>
                    updateQuantity(item.product.id, item.quantity + 1)
                  }
                >
                  +
                </button>

                <button
                  className="ml-4 text-red-400"
                  onClick={() => removeFromCart(item.product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Total: <span className="text-green-400">$ {total}</span>
            </h2>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded font-semibold"
            >
              {loading ? "Processing..." : "Checkout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;