import { Link } from "react-router";

// icons
import { FaArrowRight } from "react-icons/fa6";

// images
import heroMain from "../../../assets/hero-main.jpg";

const HeroMain = () => {
  return (
    <div
      className="w-full h-full p-8 md:p-12 lg:p-16 flex flex-col justify-center items-center md:items-start gap-6 rounded-2xl bg-cover bg-top bg-no-repeat relative overflow-hidden min-h-95 lg:min-h-125"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.55), rgba(0,0,0,0.1)), url(${heroMain})`,
      }}
    >
      <h1 className="max-w-md text-2xl md:text-5xl text-center md:text-start text-white font-bold leading-tight">
        Fresh & Healthy Organic Food
      </h1>

      <div className="border-l-4 pl-4 border-green-400 text-white flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <p className="text-lg font-semibold">Sale up to</p>
          <p className="text-sm md:text-lg font-bold px-3 py-1 bg-[#FF8A00] rounded-xl shadow-sm">
            30% OFF
          </p>
        </div>
        <p className="text-sm text-gray-100 font-light">
          Free shipping on all your orders.
        </p>
      </div>

      <Link
        to="/shop"
        className="w-fit px-8 py-3 md:py-4 flex items-center gap-3 rounded-full text-green-600 font-bold bg-white hover:bg-gray-100 hover:gap-5 transition-all shadow-md active:scale-95 cursor-pointer"
      >
        <span>Shop Now</span>
        <FaArrowRight />
      </Link>
    </div>
  );
};

export default HeroMain;
