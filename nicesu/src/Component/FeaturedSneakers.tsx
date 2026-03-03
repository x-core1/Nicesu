import { useCart } from "../Context/CartContext";
import { Product } from "../types/product";

const products = [


    {
        id: 1,
        name: "Nike Air Max 270",
        price: "$180",
        image: "/images/sneakers/Nike.jpg",
        badge: "HOT",
    },
    {
        id: 2,
        name: "Adidas Ultraboost",
        price: "$200",
        image: "/images/sneakers/Adidas.jpg",
        badge: "NEW",
    },
    {
        id: 3,
        name: "New Balance 550",
        price: "$150",
        image: "/images/sneakers/2NB 550.jpg",
    },
];

const FeaturedSneakers = () => {
    const { addToCart } = useCart();

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">

                <h2 className="text-3xl font-bold text-gray-900 mb-14">
                    Premium Product Showcase
                </h2>

                <div className="grid md:grid-cols-3 gap-10">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-500"
                        >

                            {product.badge && (
                                <span className="absolute top-4 left-4 bg-blue-900 text-white text-xs px-3 py-1 rounded-full z-10">
                                    {product.badge}
                                </span>
                            )}

                            <div className="bg-white h-72 flex items-center justify-center overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-72 object-contain group-hover:scale-110 transition duration-700"
                                />
                            </div>

                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {product.name}
                                </h3>
                                <p className="text-gray-500 mt-2">
                                    {product.price}
                                </p>
                                <button
                                    onClick={() => addToCart(product)}
                                   className="mt-5 w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-xl transition duration-300">
                                    Add to Cart
                                </button>

                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FeaturedSneakers;
