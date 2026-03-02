import { useState } from "react";
import { useCart } from "../Context/CartContext";

interface ProductsProps {
  searchTerm: string;
}

const products = [
  {
    id: 1,
    name: "Nike Air Max 270",
    price: "180",
    image: "/images/sneakers/Nike.jpg",
  },
  {
    id: 2,
    name: "Adidas Adizero EVO SL",
    price: "200",
    image: "/images/sneakers/Adidas Adizero evo SL.jpg",
  },
  {
    id: 3,
    name: "New Balance 550",
    price: "150",
    image: "/images/sneakers/2NB 550.jpg",
  },
  {
    id: 4,
    name: "Puma RS-X",
    price: "170",
    image: "/images/sneakers/3Puma RS-X-Efekt.jpg",
  },
  {
    id: 5,
    name: "Converse Run Star Trainer",
    price: "140",
    image: "/images/sneakers/Converse Run Star Trainer.jpg",
  },
  {
    id: 6,
    name: "New Balence 530",
    price: "120",
    image: "/images/sneakers/NB 530.jpg",
  }
];

const Products = ({ searchTerm }: ProductsProps) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToCart } = useCart();

  const handleBuy = () => {
    console.log("BUY CLICKED");
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="Products" className="min-h-screen bg-gray-100 px-10 py-12">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>

      {showSuccess && (
        <div className="fixed translate-y-20 inset-0 flex items-start justify-center z-50">
          <div className="bg-green-500 text-white px-8 py-4 rounded-2xl shadow-xl">
            ✅ Purchase Successful!
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition duration-300 flex flex-col"
          >
            <img
              src={product.image}
              alt={product.name}
              className="rounded-xl mb-4 w-full h-[400px] object-fit"
            />

            <h2 className="font-semibold text-lg">{product.name}</h2>
            <p className="text-gray-600 mb-4">${product.price}</p>

            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
                Add to Cart
              </button>
              <button
                onClick={handleBuy}
                className="w-1/2 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;