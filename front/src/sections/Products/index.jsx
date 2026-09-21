import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";

// icons
import { FaArrowRightLong } from "react-icons/fa6";

// components
import ProductCard from "../../components/Cards/ProductCard";

// context
import { mainStore } from "../../context/MainContext";

const Products = () => {
  const { saleProducts } = useContext(mainStore);

  return (
    <div>
      {/* Header */}
      <div className="mb-4 p-4 flex justify-between items-center rounded-2xl bg-white">
        <p className="text-3xl font-bold">Hot Deals</p>

        <Link
          to="/shop"
          className="flex items-center gap-2 text-green-500 font-semibold transition-all"
        >
          <span>View All</span>
          <FaArrowRightLong className="hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Products */}
      {saleProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {saleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p className="capitalize text-2xl text-green-500 font-bold">
            no products in sale
          </p>
        </div>
      )}
    </div>
  );
};

export default Products;
