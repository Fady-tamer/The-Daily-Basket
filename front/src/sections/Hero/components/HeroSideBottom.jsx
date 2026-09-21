import { Link } from "react-router";

// icons
import { FaArrowRight } from "react-icons/fa6";

// images
import heroSide from "../../../assets/hero-side2.jpg";

const HeroSideBottom = () => {
  return (
    <div className="relative overflow-hidden flex rounded-2xl min-h-55">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroSide})`,
        }}
      />

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content Container */}
      <div className="grow relative z-10 p-6 md:p-8 flex flex-col justify-center items-center text-center gap-2">
        <span className="text-xs uppercase tracking-widest text-green-300 font-semibold">
          Best Deal
        </span>
        <h3 className="max-w-xs text-xl md:text-2xl text-white font-bold leading-snug">
          Special Products Deal of the Month
        </h3>

        <Link
          to="/shop"
          className="w-fit mt-2 flex items-center gap-2 font-bold text-green-400 hover:text-green-300 hover:gap-3 transition-all cursor-pointer"
        >
          <span>Shop Now</span>
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default HeroSideBottom;
