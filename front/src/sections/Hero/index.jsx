// components
import HeroMain from "./components/HeroMain";
import HeroSideTop from "./components/HeroSideTop";
import HeroSideBottom from "./components/HeroSideBottom";
import HeroBottom from "./components/HeroBottom";

const Hero = () => {
  return (
    <section className="flex flex-col gap-6 pb-4">
      <div className="flex flex-col lg:flex-row gap-6 min-h-125">
        {/* Main Banner*/}
        <div className="w-full lg:w-8/12">
          <HeroMain />
        </div>

        {/* Side Banners Column*/}
        <div className="w-full lg:w-4/12 flex flex-col md:flex-row lg:flex-col gap-6">
          <HeroSideTop />
          <HeroSideBottom />
        </div>
      </div>

      {/* Features Bar */}
      <HeroBottom />
    </section>
  );
};

export default Hero;
