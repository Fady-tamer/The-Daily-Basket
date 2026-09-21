import { Link } from "react-router";

// icons
import { FaArrowRight } from "react-icons/fa6";

// images
import heroSide from "../../../assets/hero-side1.jpg";

const HeroSideTop = () => {
  return (
    <div
      className="grow p-6 md:p-8 flex flex-col justify-center gap-2 bg-cover bg-center bg-no-repeat rounded-2xl min-h-55 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.85), rgba(255,255,255,0.2)), url(${heroSide})`,
      }}
    >
      <span className="font-semibold text-xs uppercase tracking-wider text-gray-700">
        Summer Sale
      </span>
      <h3 className="text-3xl font-bold text-gray-900">75% OFF</h3>
      <p className="text-sm text-gray-600">Only Fruit & Vegetable</p>

      <Link
        to="/shop"
        className="w-fit mt-2 flex items-center gap-2 font-bold text-green-600 hover:text-green-700 hover:gap-3 transition-all cursor-pointer"
      >
        <span>Shop Now</span>
        <FaArrowRight />
      </Link>
    </div>
  );
};

export default HeroSideTop;
