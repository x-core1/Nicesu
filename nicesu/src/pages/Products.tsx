import { useEffect, useMemo, useState } from "react";
import { useCart } from "../Context/CartContext";
import { getProducts } from "../api/product.service";
import type { Product } from "../types/product";

interface ProductsProps {
  searchTerm: string;
}

const Products = ({ searchTerm }: ProductsProps) => {
  const { addToCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts();
        const data = response?.data ?? [];
        setProducts(Array.isArray(data) ? data : []);

        if (isMounted) {
          // Kalau API return null → ubah jadi array kosong
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "Failed to fetch products");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">No products found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-10 py-12">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition duration-300 flex flex-col"
          >
            <img
              src={product.image || "/placeholder.jpg"}
              alt={product.name}
              className="rounded-xl mb-4 w-full h-[400px] object-cover"
            />

            <h2 className="font-semibold text-lg">{product.name}</h2>

            <p>
              {product.stock > 0 ? (
                <span className="text-green-600 font-medium">
                  In Stock ({product.stock})
                </span>
              ) : (
                <span className="text-red-600 font-medium">Out of Stock</span>
              )}
            </p>
            <p className="text-gray-600 mb-4">
              ${Number(product.price).toLocaleString()}
            </p>

            <div className="flex gap-2 mt-auto">
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>

              <button
                onClick={() => addToCart(product)}
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