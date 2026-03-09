import { useCart } from "../Context/CartContext";
import { useOrders } from "../Context/OrderContext";
import { Trash2 } from "lucide-react";
import { useState } from "react";

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const { createOrder } = useOrders();

  const [size, setSize] = useState("42");
  const [color, setColor] = useState("White");
  const [payment, setPayment] = useState("COD");
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
        payment_method: payment,
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
    <div className="bg-slate-950 text-white min-h-screen px-24 py-20">
      <h1 className="text-5xl font-bold mb-16">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="bg-slate-900 p-10 rounded-3xl border border-white/10">
          <p className="text-gray-400 text-lg">Your cart is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-10">

          {/* LEFT SIDE */}
          <div className="col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-slate-900 p-6 rounded-3xl border border-white/10 flex items-center justify-between hover:border-blue-500 transition"
              >
                <div className="flex items-center gap-6">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />

                  <div>
                    <h2 className="text-xl font-semibold">
                      {item.product.name}
                    </h2>

                    <p className="text-gray-400">
                      Price: ${item.product.price}
                    </p>

                    <p className="text-gray-400">
                      Qty: {item.quantity}
                    </p>

                    <p className="text-gray-400 font-semibold">
                      Subtotal: $
                      {(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                    className="bg-slate-700 px-3 py-1 rounded"
                  >
                    -
                  </button>

                  <span className="w-6 text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                    className="bg-slate-700 px-3 py-1 rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-3 rounded-lg flex items-center justify-center"
                >
                  <Trash2 />
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-slate-900 p-8 rounded-3xl border border-white/10 h-fit sticky top-24">
            <h2 className="text-2xl font-semibold mb-6">My Order</h2>

            <div className="flex justify-between mb-4 text-gray-400">
              <span>Subtotal</span>
              <span>$ {total.toLocaleString()}</span>
            </div>

            <div className="border-t border-white/10 my-6"></div>

            <div className="flex justify-between text-xl font-bold mb-8">
              <span>Total</span>
              <span>$ {total.toLocaleString()}</span>
            </div>

            {/* SIZE */}
            <div className="mt-4">
              <p className="text-sm mb-1">Size</p>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2"
              >
                <option>39</option>
                <option>40</option>
                <option>41</option>
                <option>42</option>
                <option>43</option>
              </select>
            </div>

            {/* COLOR */}
            <div className="mt-4">
              <p className="text-sm mb-1">Color</p>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2"
              >
                <option>White</option>
                <option>Black</option>
                <option>Grey</option>
              </select>
            </div>

            {/* PAYMENT */}
            <div className="mt-4 mb-6">
              <p className="text-sm mb-2">Payment Method</p>

              <div className="flex gap-4">
                {["COD", "QRIS"].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPayment(method)}
                    className={`px-4 py-2 rounded-lg border ${
                      payment === method
                        ? "bg-blue-600 border-blue-600"
                        : "border-slate-600"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={loading}
              onClick={handleCheckout}
              className="w-full bg-blue-600 hover:bg-blue-700 transition py-4 rounded-2xl font-semibold disabled:opacity-50"
            >
              {loading ? "Processing..." : "Checkout"}
            </button>
          </div>

          {/* NOTIFICATION */}
          {showNotif && (
            <div className="fixed translate-y-20 inset-0 flex items-start justify-center z-50">
              <div className="bg-green-500 text-white px-8 py-4 rounded-2xl shadow-xl">
                ✅ Purchase Successful!
                <br />
                Size: {size} | Color: {color} | Payment: {payment}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;