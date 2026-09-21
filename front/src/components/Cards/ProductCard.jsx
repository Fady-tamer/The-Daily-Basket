import { useContext, useEffect, useState } from "react";
import axios from "axios";

// components
import ProductModel from "../Models/ProductModel";

// icons
import { FaHeart, FaRegHeart } from "react-icons/fa";

// context
import { mainStore } from "../../context/MainContext";

// Custom Toasts
import { CustomSuccessToast } from "../CustomToasts/CustomSuccessToast";
import { CustomErrorToast } from "../CustomToasts/CustomErrorToast";

const ProductCart = ({ product }) => {
  const [openModel, setOpenModel] = useState(false);
  const [isWish, setIsWish] = useState(false);

  const {
    BASE_URL,
    cartEndPoint,
    wishListEndPoint,
    token,
    cart,
    wishList,
    saveCartItems,
    saveWishListItems,
  } = useContext(mainStore);

  useEffect(() => {
    if (wishList) {
      setIsWish(wishList.some((item) => item.id === product.id));
    }
  }, [wishList, product]);

  const handleAddToCart = async (e) => {
    e.stopPropagation();

    try {
      const existIndex = cart.findIndex((item) => item.id === product.id);

      let updatedCart;

      if (existIndex !== -1) {
        updatedCart = [...cart];
        updatedCart[existIndex] = {
          ...updatedCart[existIndex],
          quantity: updatedCart[existIndex].quantity + 1,
        };
      } else {
        const newCartItem = {
          ...product,
          quantity: 1,
        };
        updatedCart = [...cart, newCartItem];
      }

      saveCartItems(updatedCart);

      const cartId = JSON.parse(localStorage.getItem("cartId"));
      await axios.put(
        `${BASE_URL}${cartEndPoint}/${cartId}`,
        { data: { items: updatedCart } },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      CustomSuccessToast(`${product.name} added to cart!`);
    } catch {
      CustomErrorToast("Failed to update cart");
    }
  };

  const handleAddToWishList = async (e) => {
    e.stopPropagation();

    try {
      let updatedWishList;

      updatedWishList = [...wishList, product];

      saveWishListItems(updatedWishList);

      const wishListId = JSON.parse(localStorage.getItem("wishListId"));
      await axios.put(
        `${BASE_URL}${wishListEndPoint}/${wishListId}`,
        { data: { items: updatedWishList } },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setIsWish(!isWish);

      CustomSuccessToast(`${product.name} added to wishlist!`);
    } catch {
      CustomErrorToast("Failed to add to wishlist");
    }
  };

  const handleRemoveFromWishList = async (e) => {
    e.stopPropagation();

    try {
      let updatedWishList;

      updatedWishList = wishList.filter((item) => item.id !== product.id);

      saveWishListItems(updatedWishList);

      const wishListId = JSON.parse(localStorage.getItem("wishListId"));
      await axios.put(
        `${BASE_URL}${wishListEndPoint}/${wishListId}`,
        { data: { items: updatedWishList } },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      CustomSuccessToast(`${product.name} removed from wishlist!`);
    } catch {
      CustomErrorToast("Failed to remove from wishlist");
    }
  };

  return (
    <>
      <div
        onClick={() => setOpenModel(true)}
        className="group p-4 flex flex-col rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 cursor-pointer"
      >
        {/* Product Image */}
        <div className="w-full h-48 rounded-xl overflow-hidden bg-gray-100 mb-3">
          <img
            src={product.imgUrl}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col grow justify-between">
          <div>
            <div className="flex justify-between items-center gap-2 mb-1">
              <h3 className="font-bold text-gray-800 text-base truncate grow">
                {product.name}
              </h3>
              {product.category_name && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md shrink-0 capitalize">
                  {product.category_name}
                </span>
              )}
            </div>

            {product.sale > 0 ? (
              <div className="my-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-gray-500 line-through">
                    ${product.price}
                  </p>
                  <p className="font-bold text-green-500">
                    $
                    {Number(
                      product.price - product.price * (product.sale / 100),
                    ).toFixed(2)}
                  </p>
                </div>
                <div className="px-2 py-1 rounded bg-red-500">
                  <p className="text-white font-semibold">
                    {product.sale}% OFF
                  </p>
                </div>
              </div>
            ) : (
              <p className="my-4 font-bold text-green-500">
                ${product.price ? Number(product.price).toFixed(2) : "0.00"}
              </p>
            )}
          </div>

          <div className="flex gap-4">
            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="w-full py-2.5 px-4 rounded-xl text-sm font-bold text-white bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-sm cursor-pointer active:scale-95"
            >
              {product.stock > 0 ? "Add To Cart" : "Out of Stock"}
            </button>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={isWish ? handleRemoveFromWishList : handleAddToWishList}
              className="p-2.5 rounded-full text-green-700 bg-green-100 hover:bg-green-200 transition-colors cursor-pointer shrink-0"
              aria-label="Toggle Wishlist"
            >
              {isWish ? (
                <FaHeart className="w-5 h-5 text-red-500" />
              ) : (
                <FaRegHeart className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {openModel && (
        <ProductModel
          id={product.id}
          product={product}
          setOpenModel={setOpenModel}
        />
      )}
    </>
  );
};

export default ProductCart;
