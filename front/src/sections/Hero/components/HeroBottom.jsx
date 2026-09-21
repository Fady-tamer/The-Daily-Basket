// icons
import { BiSupport } from "react-icons/bi";
import { BsBagCheckFill } from "react-icons/bs";
import { FaBoxOpen } from "react-icons/fa6";
import { LuCaravan } from "react-icons/lu";

const features = [
  {
    icon: (
      <LuCaravan className="text-4xl lg:text-5xl text-green-500 shrink-0" />
    ),
    title: "Free Shipping",
    description: "Free shipping on all your orders",
  },
  {
    icon: (
      <BiSupport className="text-4xl lg:text-5xl text-green-500 shrink-0" />
    ),
    title: "Customer Support 24/7",
    description: "Instant access to support",
  },
  {
    icon: (
      <BsBagCheckFill className="text-4xl lg:text-5xl text-green-500 shrink-0" />
    ),
    title: "100% Secure Payment",
    description: "We ensure your money is safe",
  },
  {
    icon: (
      <FaBoxOpen className="text-4xl lg:text-5xl text-green-500 shrink-0" />
    ),
    title: "Money-Back Guarantee",
    description: "30-day money-back guarantee",
  },
];

const HeroBottom = () => {
  return (
    <div className="p-4 lg:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 rounded-2xl bg-white border border-gray-100">
      {features.map(({ icon, title, description }) => (
        <div
          key={title}
          className="mx-auto flex items-center gap-4 p-2 rounded-xl transition-all duration-300 hover:bg-gray-50/80"
        >
          {icon}
          <div>
            <h4 className="font-bold text-gray-800 text-sm md:text-base">
              {title}
            </h4>
            <p className="text-xs text-gray-500 mt-0.5">{description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroBottom;
