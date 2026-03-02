import HeroSection from "../Component/HeroSection";
import BrandStrip from "../Component/BrandStrip";
import FeaturedSneakers from "../Component/FeaturedSneakers";

import WhyChooseUs from "../Component/WhyChooseUs";

const Home = () => {
  return (
    <div className="bg-white min-h-screen">
      <HeroSection />
      <BrandStrip />
      <FeaturedSneakers />
      <WhyChooseUs />
    </div>
  );
};

export default Home;
