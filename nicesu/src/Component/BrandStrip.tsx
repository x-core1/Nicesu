const brands = [
  "/images/brands/3Nike.png",
  "/images/brands/2Adidas.png", 
  "/images/brands/NB.png",
  "/images/brands/Puma.png",
  "/images/brands/Converse.png",
];

const BrandStrip = () => {
  const loopBrands = [...brands, ...brands]; // biar looping smooth

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <h2 className="text-center text-gray-900 font-semibold mb-12 text-lg tracking-wide">
          FEATURED BRANDS
        </h2>

        <div className="relative overflow-hidden">
          <div className="flex gap-20 animate-scroll items-center">
            {loopBrands.map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt="brand"
                className="h-16 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-300"
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default BrandStrip;
