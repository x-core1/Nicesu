import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
        
        <div>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Own The Street.
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-lg">
            Discover premium sneakers built for comfort, durability,
            and everyday confidence.
          </p>

          <div className="mt-10 flex gap-4">
            <button
              onClick={() => navigate("/Products")}
              className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-xl transition"
            >
              Shop Now
            </button>

            <button
              onClick={() => navigate("/Products")}
              className="bg-zinc-800 hover:bg-yellow-900 text-white px-6 py-3 rounded-xl transition"
            >
              Explore Collection
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
