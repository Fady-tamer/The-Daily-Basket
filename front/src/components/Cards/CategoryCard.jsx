import React, { useContext } from "react";
import { Link } from "react-router";

// context
import { mainStore } from "../../context/MainContext";

const CategoryCard = ({ documentId, name, imgUrl }) => {
  const { setSelectedCategory } = useContext(mainStore);

  return (
    <Link
      to="/shop"
      data-id={documentId}
      onClick={() => setSelectedCategory(name)}
      className="group flex flex-col rounded-2xl hover:shadow-xl transition-all duration-300 overflow-hidden bg-white border border-gray-100 hover:-translate-y-1 cursor-pointer"
    >
      <div className="w-full h-36 bg-gray-50 overflow-hidden">
        <img
          src={imgUrl}
          alt={name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="py-3 px-2 text-center text-sm font-bold text-gray-700 group-hover:text-green-600 transition-colors line-clamp-1">
        {name}
      </h3>
    </Link>
  );
};

export default CategoryCard;
