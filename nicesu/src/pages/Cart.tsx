import { useCart } from "../Context/CartContext";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { products } from "../data/Products";
import { useOrders } from "../Context/OrderContext";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const [size, setSize] = useState("42");
  const [color, setColor] = useState("White");
  const [payment, setPayment] = useState("COD");
  const [showNotif, setShowNotif] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const { createOrder } = useOrders();

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    const newOrder = {
      items: cart.map((item) => ({
        product: item.product,
        quantity: item.quantity,
      })),
      customerName: "Guest User",
      total,
      payment,
      status: "PENDING" as const,
      createdAt: new Date().toISOString(),
    };

    await createOrder(newOrder);

    clearCart();
    setShowNotif(true);

    setTimeout(() => setShowNotif(false), 3000)
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen px-24 py-20">
      <h1 className="text-5xl font-bold mb-16">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="bg-slate-900 p-10 rounded-3xl border border-white/10">
          <p className="text-gray-400 text-lg">
            Your cart is empty.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-10">

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
                      Subtotal: ${(item.product.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-3 rounded-lg flex flex-row justify-center items-center gap-3"
                >
                  <Trash2 />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl border border-white/10 h-fit sticky top-24">
            <h2 className="text-2xl font-semibold mb-6">
              My Order
            </h2>

            <div className="flex justify-between mb-4 text-gray-400">
              <span>Subtotal</span>
              <span>$ {total.toLocaleString()}</span>
            </div>

            <div className="border-t border-white/10 my-6"></div>

            <div className="flex justify-between text-xl font-bold mb-8">
              <span>Total</span>
              <span>$ {total.toLocaleString()}</span>
            </div>

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

            <div className="mt-4 mb-6">
              <p className="text-sm mb-2">Payment Method</p>

              <div className="flex gap-4">
                <button
                  onClick={() => setPayment("COD")}
                  className={`px-4 py-2 rounded-lg border ${payment === "COD"
                    ? "bg-blue-600 border-blue-600"
                    : "border-slate-600"
                    }`}
                >
                  COD
                </button>

                <button
                  onClick={() => setPayment("QRIS")}
                  className={`px-4 py-2 rounded-lg border ${payment === "QRIS"
                    ? "bg-blue-600 border-blue-600"
                    : "border-slate-600"
                    }`}
                >
                  QRIS
                </button>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 hover:bg-blue-700 transition py-4 rounded-2xl font-semibold">
              Checkout
            </button>
          </div>
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